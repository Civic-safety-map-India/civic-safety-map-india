export type CameraStatus = 'working' | 'broken' | 'unsure';

export interface CameraNode {
  id: string; // OSM ID or synthetic ID
  lat: number;
  lng: number;
  source: 'osm' | 'user_contributed';
  tags: {
    surveillance?: string;
    operator?: string;
    name?: string;
    description?: string;
    [key: string]: string | undefined;
  };
  operationalStatus: CameraStatus;
  lastReportedAt?: string;
  reportCount: number;
}

export type ModerationStatus = 'pending' | 'approved' | 'rejected';

export interface StatusReport {
  id: string;
  cameraId: string;
  status: CameraStatus;
  timestamp: string;
  photoUrl?: string;
  notes?: string;
  moderationStatus: ModerationStatus;
  ipHash?: string; // Anonymized rate-limiting hash
}
