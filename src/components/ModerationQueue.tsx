import React from 'react';
import type { StatusReport } from '../types/camera';

interface ModerationQueueProps {
  reports: StatusReport[];
  onApprove: (reportId: string) => void;
  onReject: (reportId: string) => void;
  onClose: () => void;
}

export const ModerationQueue: React.FC<ModerationQueueProps> = ({
  reports,
  onApprove,
  onReject,
  onClose,
}) => {
  const pendingReports = reports.filter((r) => r.moderationStatus === 'pending');

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-box"
        style={{ maxWidth: '640px', maxHeight: '80vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '12px',
          }}
        >
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Moderation Review Queue</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              {pendingReports.length} submission{pendingReports.length === 1 ? '' : 's'} pending verification
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', color: 'var(--text-muted)', fontSize: '20px' }}
          >
            ✕
          </button>
        </div>

        {pendingReports.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: '28px', marginBottom: '8px' }}>🎉</p>
            <p style={{ fontSize: '14px', fontWeight: 600 }}>Queue is completely clear!</p>
            <p style={{ fontSize: '12px', marginTop: '4px' }}>
              All submitted operational status reports have been moderated.
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {pendingReports.map((report) => (
              <div
                key={report.id}
                style={{
                  background: 'var(--bg-panel)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '14px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '8px',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: '11px',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background:
                          report.status === 'working'
                            ? 'rgba(16, 185, 129, 0.2)'
                            : report.status === 'broken'
                            ? 'rgba(239, 68, 68, 0.2)'
                            : 'rgba(245, 158, 11, 0.2)',
                        color:
                          report.status === 'working'
                            ? 'var(--status-working)'
                            : report.status === 'broken'
                            ? 'var(--status-broken)'
                            : 'var(--status-unsure)',
                      }}
                    >
                      Reported: {report.status}
                    </span>
                    <span
                      style={{
                        fontSize: '12px',
                        color: 'var(--text-muted)',
                        marginLeft: '8px',
                      }}
                    >
                      Camera Node: {report.cameraId}
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                    {new Date(report.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                {report.notes && (
                  <p style={{ fontSize: '13px', color: 'var(--text-main)', marginBottom: '8px', lineHeight: '1.4' }}>
                    "{report.notes}"
                  </p>
                )}

                {report.photoUrl && (
                  <div style={{ marginBottom: '8px' }}>
                    <a
                      href={report.photoUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: '12px', color: 'var(--accent)', textDecoration: 'underline' }}
                    >
                      📸 View Attached Photo Evidence
                    </a>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '10px' }}>
                  <button
                    onClick={() => onReject(report.id)}
                    style={{
                      padding: '6px 12px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      color: 'var(--status-broken)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    ✕ Reject / Flag
                  </button>
                  <button
                    onClick={() => onApprove(report.id)}
                    style={{
                      padding: '6px 16px',
                      background: 'var(--status-working)',
                      color: '#ffffff',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    ✓ Approve & Publish
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
