import React, { useState } from 'react';
import type { CameraNode, CameraStatus, StatusReport } from '../types/camera';

interface ReportModalProps {
  camera: CameraNode;
  onClose: () => void;
  onSubmitReport: (report: Omit<StatusReport, 'id' | 'timestamp' | 'moderationStatus'>) => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ camera, onClose, onSubmitReport }) => {
  const [selectedStatus, setSelectedStatus] = useState<CameraStatus>('working');
  const [notes, setNotes] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReport({
      cameraId: camera.id,
      status: selectedStatus,
      notes: notes.trim(),
      photoUrl: photoUrl.trim() || undefined,
    });
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '24px 0' }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>✅</div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '8px' }}>
              Report Received for Moderation
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
              Thank you. To prevent spam and maintain legal integrity, all community submissions
              are reviewed before appearing publicly on the map.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '17px', fontWeight: 700 }}>Report Camera Operational Status</h3>
              <button
                type="button"
                onClick={onClose}
                style={{ background: 'none', color: 'var(--text-muted)', fontSize: '18px' }}
              >
                ✕
              </button>
            </div>

            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Node: <strong style={{ color: 'var(--text-main)' }}>{camera.tags.name || camera.id}</strong>
              <br />
              Coords: {camera.lat.toFixed(4)}, {camera.lng.toFixed(4)}
            </div>

            {/* Status Selector */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
                OBSERVED PHYSICAL STATUS
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedStatus('working')}
                  style={{
                    padding: '10px 8px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    background: selectedStatus === 'working' ? 'rgba(16, 185, 129, 0.2)' : 'var(--bg-panel)',
                    border: `2px solid ${selectedStatus === 'working' ? 'var(--status-working)' : 'var(--border-color)'}`,
                    color: selectedStatus === 'working' ? 'var(--status-working)' : 'var(--text-main)',
                  }}
                >
                  🟢 Working
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedStatus('broken')}
                  style={{
                    padding: '10px 8px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    background: selectedStatus === 'broken' ? 'rgba(239, 68, 68, 0.2)' : 'var(--bg-panel)',
                    border: `2px solid ${selectedStatus === 'broken' ? 'var(--status-broken)' : 'var(--border-color)'}`,
                    color: selectedStatus === 'broken' ? 'var(--status-broken)' : 'var(--text-main)',
                  }}
                >
                  🔴 Broken / Offline
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedStatus('unsure')}
                  style={{
                    padding: '10px 8px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 600,
                    background: selectedStatus === 'unsure' ? 'rgba(245, 158, 11, 0.2)' : 'var(--bg-panel)',
                    border: `2px solid ${selectedStatus === 'unsure' ? 'var(--status-unsure)' : 'var(--border-color)'}`,
                    color: selectedStatus === 'unsure' ? 'var(--status-unsure)' : 'var(--text-main)',
                  }}
                >
                  🟡 Unsure / Blind Spot
                </button>
              </div>
            </div>

            {/* Optional Photo URL */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                PHOTO PROOF URL (OPTIONAL)
              </label>
              <input
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://imgur.com/... or public image link"
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: 'var(--bg-panel)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-main)',
                  fontSize: '13px',
                }}
              />
            </div>

            {/* Observations & Notes with Guardrail */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '6px' }}>
                OBSERVATION NOTES
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="e.g. Broken lens, wire cut, obscured by overgrown tree branch, no power LED visible."
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  background: 'var(--bg-panel)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-main)',
                  fontSize: '13px',
                  resize: 'none',
                }}
              />
              <p style={{ fontSize: '11px', color: '#f59e0b', marginTop: '6px', lineHeight: '1.4' }}>
                ⚠️ <strong>Legal Guardrail:</strong> Do not name individual police officers or victims. Reports containing personal names or defamatory allegations are automatically rejected.
              </p>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '8px 16px',
                  background: 'transparent',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  fontSize: '13px',
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: '8px 20px',
                  background: 'var(--accent)',
                  color: '#ffffff',
                  borderRadius: '8px',
                  fontSize: '13px',
                  fontWeight: 600,
                }}
              >
                Submit Report
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
