import React from 'react';
import GoogleMap from '../../components/GoogleMap';
import MapMediator from './mediator';
import Nav from '../../components/Nav';
import WikiModal from '../../components/WikiModal';

export default function MapView() {
  return (
    <>
      <MapMediator />
      <Nav />
      <WikiModal />
      <GoogleMap />
    </>
  );
}
