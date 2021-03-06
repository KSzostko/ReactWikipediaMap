import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Place from '../Place';
import { styles } from './styles';
import { emit } from '../../views/map/mediator';
import * as events from '../../types/events';
import { useMapStore } from '../../views/map/store';

const defaultZoom = 15;
const minZoom = 10;

export default function GoogleMap() {
  const [{ articles, mapCenter, isLight }, { setMapCenter }] = useMapStore();

  const [mapZoom, setMapZoom] = useState(defaultZoom);

  useEffect(() => {
    emit(events.MAP_DRAGGED, mapCenter);
  }, [mapCenter]);

  function handleChange({ center, zoom }) {
    setMapCenter(center);
    setMapZoom(zoom);
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAPS_KEY,
          libraries: ['places'],
        }}
        center={mapCenter}
        zoom={mapZoom}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={() => emit(events.MAP_LOADED)}
        options={{
          minZoom,
          styles: isLight ? styles.light : styles.dark,
        }}
        onChange={handleChange}
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
