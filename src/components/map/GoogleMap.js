import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Place from './Place';
import { WikiApi } from '../../services/api/wiki';
// import { emit } from './mediator';
// import * as events from './eventTypes';

const defaultCenter = {
  lat: 53.11,
  lng: 23.14,
};
const defaultZoom = 15;
const minZoom = 10;

export default function GoogleMap() {
  const [articles, setArticles] = useState([]);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [mapZoom, setMapZoom] = useState(defaultZoom);

  useEffect(() => {
    async function loadArticles() {
      const newArticles = await WikiApi.getArticles({ coord: mapCenter });
      setArticles(newArticles.query.geosearch);

      console.log(newArticles.query.geosearch);
    }

    loadArticles();

    // emit(events.MAP_DRAGGED, mapCenter);
  }, [mapCenter]);

  function handleBoundsChange(center, zoom) {
    setMapCenter(center);
    setMapZoom(zoom);
  }

  return (
    <div style={{ height: '91vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          // key: process.env.REACT_APP_GOOGLE_MAPS_KEY,
          libraries: ['places'],
        }}
        center={mapCenter}
        zoom={mapZoom}
        yesIWantToUseGoogleMapApiInternals
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
