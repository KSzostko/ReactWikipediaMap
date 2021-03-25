import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Layout, Input } from 'antd';
import { useMapStore } from './map/store';

const { Header } = Layout;
const { Search } = Input;

const StyledHeader = styled(Header)`
  display: flex;
  align-items: center;
`;

const StyledTitle = styled.h1`
  font-size: 24px;
  color: #fff;
  font-weight: 600;
`;

const StyledInput = styled(Search)`
  margin-left: 20px;
`;

export default function Nav() {
  const [{ isGoogleApiLoaded }, { setMapCenter }] = useMapStore();

  useEffect(() => {
    if (isGoogleApiLoaded) {
      const input = document.getElementById('searchbox');
      const searchbox = new window.google.maps.places.SearchBox(input);

      searchbox.addListener('places_changed', () => {
        const locationData = searchbox.getPlaces()[0].geometry.location;

        const newMapCenter = {
          lat: locationData.lat(),
          lng: locationData.lng(),
        };
        setMapCenter(newMapCenter);
      });
    }
  }, [isGoogleApiLoaded, setMapCenter]);

  return (
    <StyledHeader>
      <StyledTitle>WikipediaMap</StyledTitle>
      <StyledInput
        id="searchbox"
        placeholder="Search..."
        style={{ width: 250 }}
      />
    </StyledHeader>
  );
}
