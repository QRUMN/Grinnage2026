import React from 'react';
import Map, { Source, Layer } from 'react-map-gl';
import type { FillLayer } from 'react-map-gl';

// Delaware state coordinates
const delawareCoordinates = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'Polygon',
    coordinates: [[
      [-75.788658, 39.721946], // Northern border
      [-75.693617, 39.722723],
      [-75.644521, 39.724897],
      [-75.597172, 39.726200],
      [-75.556946, 39.767489],
      [-75.557654, 39.821882],
      [-75.510817, 39.838876],
      [-75.468458, 39.840238],
      [-75.403272, 39.826708],
      [-75.320617, 39.768820],
      [-75.313676, 39.725591],
      [-75.286873, 39.679147],
      [-75.247823, 39.617738],
      [-75.217652, 39.566872],
      [-75.190591, 39.508143],
      [-75.167852, 39.452997],
      [-75.136438, 39.394621],
      [-75.111075, 39.350059],
      [-75.086561, 39.297051],
      [-75.047811, 39.248983],
      [-75.016561, 39.214820],
      [-75.013491, 39.148535],
      [-75.048648, 38.930528],
      [-75.068857, 38.849505],
      [-75.093772, 38.782099],
      [-75.350501, 38.455155],
      [-75.699359, 38.460144],
      [-75.710611, 38.590890],
      [-75.724152, 38.732871],
      [-75.737396, 38.898952],
      [-75.759648, 39.145823],
      [-75.775972, 39.247104],
      [-75.788658, 39.721946] // Back to start
    ]]
  }
};

const layerStyle: FillLayer = {
  id: 'delaware',
  type: 'fill',
  paint: {
    'fill-color': '#56e39f',
    'fill-opacity': 0.3,
    'fill-outline-color': '#48c98a'
  }
};

export const ContactMap = () => {
  return (
    <div className="bg-surface-50/5 backdrop-blur-sm p-8 rounded-lg border border-surface-50/10">
      <h2 className="text-2xl font-bold text-surface-50 mb-6">Our Service Area</h2>
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
        <Map
          mapboxAccessToken="pk.eyJ1IjoicXJ1bW4iLCJhIjoiY200eThrNGVnMHZ3djJycHB6eXFhb2o4YiJ9.2wIbjSRW5fLtPjHz0AomPQ"
          initialViewState={{
            longitude: -75.5,
            latitude: 39.2,
            zoom: 7
          }}
          style={{ width: '100%', height: '100%' }}
          mapStyle="mapbox://styles/mapbox/dark-v11"
        >
          <Source type="geojson" data={delawareCoordinates as any}>
            <Layer {...layerStyle} />
          </Source>
        </Map>
      </div>
      <p className="mt-4 text-surface-200">
        Proudly serving all of Delaware
      </p>
    </div>
  );
};