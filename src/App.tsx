import { useState, useEffect, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { MapView } from './components/MapView';
import { ReportModal } from './components/ReportModal';
import { ModerationQueue } from './components/ModerationQueue';
import { INITIAL_DELHI_CAMERAS } from './data/mockCameras';
import { fetchCamerasFromOverpass } from './services/overpass';
import type { CameraNode, CameraStatus, StatusReport } from './types/camera';

export function App() {
  const [cameras, setCameras] = useState<CameraNode[]>(INITIAL_DELHI_CAMERAS);
  const [filterStatus, setFilterStatus] = useState<CameraStatus | 'all'>('all');
  const [selectedCamera, setSelectedCamera] = useState<CameraNode | null>(null);
  const [isModerationOpen, setIsModerationOpen] = useState(false);

  // Initial mock reports in queue
  const [reports, setReports] = useState<StatusReport[]>([
    {
      id: 'rep-001',
      cameraId: 'osm-delhi-104',
      status: 'broken',
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      notes: 'Camera dome is cracked and LED indicator is unlit.',
      moderationStatus: 'pending',
    },
    {
      id: 'rep-002',
      cameraId: 'osm-delhi-105',
      status: 'working',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      notes: 'Green status light blinking, unobstructed view down the street.',
      moderationStatus: 'pending',
    },
  ]);

  // Attempt background fetch of fresh Overpass nodes
  useEffect(() => {
    let isMounted = true;
    fetchCamerasFromOverpass().then((freshNodes) => {
      if (isMounted && freshNodes.length > 0) {
        // Merge with initial statuses
        setCameras((prev) => {
          const statusMap = new Map(prev.map((c) => [c.id, c]));
          return freshNodes.map((fn) => {
            const existing = statusMap.get(fn.id);
            if (existing) {
              return { ...fn, operationalStatus: existing.operationalStatus, reportCount: existing.reportCount };
            }
            return fn;
          });
        });
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Filtered cameras for rendering
  const filteredCameras = useMemo(() => {
    if (filterStatus === 'all') return cameras;
    return cameras.filter((c) => c.operationalStatus === filterStatus);
  }, [cameras, filterStatus]);

  // Metrics
  const cameraCounts = useMemo(() => {
    const working = cameras.filter((c) => c.operationalStatus === 'working').length;
    const broken = cameras.filter((c) => c.operationalStatus === 'broken').length;
    const unsure = cameras.filter((c) => c.operationalStatus === 'unsure').length;
    return {
      total: cameras.length,
      working,
      broken,
      unsure,
    };
  }, [cameras]);

  const pendingReviewCount = useMemo(() => {
    return reports.filter((r) => r.moderationStatus === 'pending').length;
  }, [reports]);

  // Handle report submission from user
  const handleAddReport = useCallback(
    (reportData: Omit<StatusReport, 'id' | 'timestamp' | 'moderationStatus'>) => {
      const newReport: StatusReport = {
        ...reportData,
        id: `rep-${Date.now()}`,
        timestamp: new Date().toISOString(),
        moderationStatus: 'pending',
      };
      setReports((prev) => [newReport, ...prev]);
    },
    []
  );

  // Moderation handlers
  const handleApproveReport = useCallback((reportId: string) => {
    setReports((prev) => {
      const target = prev.find((r) => r.id === reportId);
      if (!target) return prev;

      // Update camera status
      setCameras((camList) =>
        camList.map((cam) => {
          if (cam.id === target.cameraId) {
            return {
              ...cam,
              operationalStatus: target.status,
              reportCount: cam.reportCount + 1,
              lastReportedAt: new Date().toISOString(),
            };
          }
          return cam;
        })
      );

      return prev.map((r) => (r.id === reportId ? { ...r, moderationStatus: 'approved' } : r));
    });
  }, []);

  const handleRejectReport = useCallback((reportId: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, moderationStatus: 'rejected' } : r))
    );
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        cameraCounts={cameraCounts}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
        pendingReviewCount={pendingReviewCount}
        onOpenModeration={() => setIsModerationOpen(true)}
      />

      <main style={{ flex: 1, position: 'relative' }}>
        <MapView cameras={filteredCameras} onSelectCamera={setSelectedCamera} />

        {/* Legend Overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '24px',
            background: 'rgba(18, 24, 32, 0.9)',
            backdropFilter: 'blur(8px)',
            border: '1px solid var(--border-color)',
            borderRadius: '10px',
            padding: '12px 16px',
            zIndex: 1000,
            fontSize: '12px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: '8px', color: 'var(--text-main)' }}>
            SURVEILLANCE STATUS KEY
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--status-working)' }} />
              <span>Verified Operational</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--status-broken)' }} />
              <span>Offline / Broken (Blind Spot)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--status-unsure)' }} />
              <span>Unverified / Needs Field Check</span>
            </div>
          </div>
        </div>
      </main>

      {/* Report Modal */}
      {selectedCamera && (
        <ReportModal
          camera={selectedCamera}
          onClose={() => setSelectedCamera(null)}
          onSubmitReport={handleAddReport}
        />
      )}

      {/* Moderation Queue Modal */}
      {isModerationOpen && (
        <ModerationQueue
          reports={reports}
          onApprove={handleApproveReport}
          onReject={handleRejectReport}
          onClose={() => setIsModerationOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
