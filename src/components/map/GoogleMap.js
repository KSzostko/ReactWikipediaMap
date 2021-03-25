import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Place from './Place';
import { emit } from './mediator';
import * as events from './eventTypes';
import { useMapStore } from './store';

const defaultZoom = 15;
const minZoom = 10;

export default function GoogleMap() {
  const [{ articles, mapCenter }, { setMapCenter }] = useMapStore();

  const [mapZoom, setMapZoom] = useState(defaultZoom);

  useEffect(() => {
    emit(events.MAP_DRAGGED, mapCenter);
  }, [mapCenter]);

  function handleBoundsChange(center, zoom) {
    setMapCenter(center);
    setMapZoom(zoom);
  }

  return (
    <div style={{ height: '91vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAPS_KEY,
          libraries: ['places'],
        }}
        center={mapCenter}
        zoom={mapZoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map }) => emit(events.MAP_LOADED, map)}
        options={{
          minZoom,
        }}
        onBoundsChange={handleBoundsChange}
      >
        {articles.map(article => (
          <Place
            key={article.pageid}
            lat={article.lat}
            lng={article.lon}
            article={article}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
