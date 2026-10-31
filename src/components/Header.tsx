import React from 'react';
import type { CameraStatus } from '../types/camera';

interface HeaderProps {
  cameraCounts: {
    total: number;
    working: number;
    broken: number;
    unsure: number;
  };
  filterStatus: CameraStatus | 'all';
  onFilterChange: (status: CameraStatus | 'all') => void;
  pendingReviewCount: number;
  onOpenModeration: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cameraCounts,
  filterStatus,
  onFilterChange,
  pendingReviewCount,
  onOpenModeration,
}) => {
  return (
    <header
      style={{
        height: '72px',
        background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-color)',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 1000,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>🛡️</span>
            <h1 style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Civic Safety Map <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(India)</span>
            </h1>
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Delhi Pilot · OpenStreetMap Surveillance & Blind Spot Transparency
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Metric Badges / Filters */}
        <button
          onClick={() => onFilterChange('all')}
          style={{
            background: filterStatus === 'all' ? 'var(--bg-panel)' : 'transparent',
            border: `1px solid ${filterStatus === 'all' ? 'var(--accent)' : 'var(--border-color)'}`,
            color: 'var(--text-main)',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '13px',
          }}
        >
          All: <strong>{cameraCounts.total}</strong>
        </button>

        <button
          onClick={() => onFilterChange('working')}
          style={{
            background: filterStatus === 'working' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
            border: `1px solid ${filterStatus === 'working' ? 'var(--status-working)' : 'var(--border-color)'}`,
            color: 'var(--status-working)',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '13px',
          }}
        >
          Working: <strong>{cameraCounts.working}</strong>
        </button>

        <button
          onClick={() => onFilterChange('broken')}
          style={{
            background: filterStatus === 'broken' ? 'rgba(239, 68, 68, 0.2)' : 'transparent',
            border: `1px solid ${filterStatus === 'broken' ? 'var(--status-broken)' : 'var(--border-color)'}`,
            color: 'var(--status-broken)',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '13px',
          }}
        >
          Broken: <strong>{cameraCounts.broken}</strong>
        </button>

        <button
          onClick={() => onFilterChange('unsure')}
          style={{
            background: filterStatus === 'unsure' ? 'rgba(245, 158, 11, 0.2)' : 'transparent',
            border: `1px solid ${filterStatus === 'unsure' ? 'var(--status-unsure)' : 'var(--border-color)'}`,
            color: 'var(--status-unsure)',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '13px',
          }}
        >
          Unverified: <strong>{cameraCounts.unsure}</strong>
        </button>

        <div style={{ width: '1px', height: '24px', background: 'var(--border-color)' }} />

        {/* Moderation Queue Trigger */}
        <button
          onClick={onOpenModeration}
          style={{
            background: pendingReviewCount > 0 ? 'rgba(59, 130, 246, 0.15)' : 'var(--bg-panel)',
            border: `1px solid ${pendingReviewCount > 0 ? 'var(--accent)' : 'var(--border-color)'}`,
            color: pendingReviewCount > 0 ? 'var(--accent)' : 'var(--text-muted)',
            padding: '6px 14px',
            borderRadius: '8px',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontWeight: 600,
          }}
        >
          <span>⚖️ Review Queue</span>
          {pendingReviewCount > 0 && (
            <span
              style={{
                background: 'var(--accent)',
                color: '#fff',
                borderRadius: '9999px',
                padding: '2px 7px',
                fontSize: '11px',
              }}
            >
              {pendingReviewCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
