import React from 'react';
import GoogleMap from '../../components/GoogleMap';
import MapMediator from './mediator';
import Nav from '../../components/Nav';

export default function MapView() {
  return (
    <>
      <MapMediator />
      <Nav />
      <GoogleMap />
    </>
  );
}
