import type { CameraNode } from '../types/camera';
import { INITIAL_DELHI_CAMERAS } from '../data/mockCameras';

const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://maps.mail.ru/osm/tools/overpass/api/interpreter',
];

export interface BoundingBox {
  south: number;
  west: number;
  north: number;
  east: number;
}

// Default Delhi Metropolitan bbox
export const DELHI_BBOX: BoundingBox = {
  south: 28.40,
  west: 76.90,
  north: 28.85,
  east: 77.40,
};

export async function fetchCamerasFromOverpass(
  bbox: BoundingBox = DELHI_BBOX,
  useFallbackOnFail: boolean = true
): Promise<CameraNode[]> {
  const query = `
    [out:json][timeout:20];
    (
      node["man_made"="surveillance"](${bbox.south},${bbox.west},${bbox.north},${bbox.east});
      way["man_made"="surveillance"](${bbox.south},${bbox.west},${bbox.north},${bbox.east});
    );
    out body center 100;
  `;

  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(query)}`,
      });

      if (!response.ok) {
        continue;
      }

      const data = await response.json();
      if (!data.elements || data.elements.length === 0) {
        continue;
      }

      const mapped: CameraNode[] = data.elements.map((el: any) => {
        const lat = el.lat ?? el.center?.lat;
        const lng = el.lon ?? el.center?.lon;
        return {
          id: `osm-${el.id}`,
          lat,
          lng,
          source: 'osm',
          tags: el.tags || {},
          operationalStatus: 'unsure', // Unreported defaults to unsure
          reportCount: 0,
        };
      });

      return mapped;
    } catch {
      // Try next endpoint
    }
  }

  if (useFallbackOnFail) {
    console.warn('Overpass unreachable or throttled. Using seeded Delhi baseline.');
    return INITIAL_DELHI_CAMERAS;
  }

  return [];
}
