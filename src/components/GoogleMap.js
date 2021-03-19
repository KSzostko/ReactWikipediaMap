import React from 'react';
import GoogleMapReact from 'google-map-react';

const ReactComponent = () => <div>Hello google map</div>;

const defaultCenter = {
  lat: 53.11,
  lng: 23.14,
};
const defaultZoom = 15;
const minZoom = 10;

export default function GoogleMap() {
  return (
    <div style={{ height: '91vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_MAPS_KEY,
          libraries: ['places'],
        }}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        yesIWantToUseGoogleMapApiInternals
        options={{
          minZoom,
        }}
      >
        <ReactComponent />
      </GoogleMapReact>
    </div>
  );
}
