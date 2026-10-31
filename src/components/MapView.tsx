import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import type { CameraNode } from '../types/camera';

interface MapViewProps {
  cameras: CameraNode[];
  onSelectCamera: (camera: CameraNode) => void;
}

export const MapView: React.FC<MapViewProps> = ({ cameras, onSelectCamera }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center on Delhi (Connaught Place)
    const map = L.map(mapContainerRef.current, {
      center: [28.6315, 77.2167],
      zoom: 13,
      zoomControl: true,
    });

    // Dark-themed or clean OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Sync Markers
  useEffect(() => {
    const markersGroup = markersLayerRef.current;
    if (!markersGroup) return;

    markersGroup.clearLayers();

    cameras.forEach((camera) => {
      const colorMap = {
        working: '#10b981',
        broken: '#ef4444',
        unsure: '#f59e0b',
      };
      const symbolMap = {
        working: '●',
        broken: '✕',
        unsure: '?',
      };

      const color = colorMap[camera.operationalStatus];
      const symbol = symbolMap[camera.operationalStatus];

      const icon = L.divIcon({
        className: 'custom-camera-pin',
        html: `
          <div style="
            background: ${color};
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 13px;
            font-weight: 700;
            border: 2px solid #ffffff;
            box-shadow: 0 4px 10px rgba(0,0,0,0.5);
            cursor: pointer;
          ">
            ${symbol}
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker([camera.lat, camera.lng], { icon });

      const operatorName = camera.tags.operator || 'Public Agency / Police';
      const cameraName = camera.tags.name || `CCTV Node (${camera.id})`;

      const popupContent = document.createElement('div');
      popupContent.style.fontFamily = 'inherit';
      popupContent.style.padding = '4px';
      popupContent.innerHTML = `
        <div style="font-size: 14px; font-weight: 700; margin-bottom: 4px; color: #111;">
          ${cameraName}
        </div>
        <div style="font-size: 12px; color: #555; margin-bottom: 8px;">
          Operator: <strong>${operatorName}</strong><br/>
          Status: <strong style="color: ${color}; text-transform: uppercase;">${camera.operationalStatus}</strong><br/>
          Verified reports: <strong>${camera.reportCount}</strong>
        </div>
      `;

      const reportBtn = document.createElement('button');
      reportBtn.innerText = 'Submit Status Report';
      reportBtn.style.cssText = `
        width: 100%;
        padding: 6px 12px;
        background: #2563eb;
        color: white;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
      `;
      reportBtn.onclick = () => {
        onSelectCamera(camera);
      };

      popupContent.appendChild(reportBtn);
      marker.bindPopup(popupContent);
      markersGroup.addLayer(marker);
    });
  }, [cameras, onSelectCamera]);

  return <div ref={mapContainerRef} className="map-container" />;
};
