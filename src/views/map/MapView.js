import React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import GoogleMap from '../../components/GoogleMap';
import MapMediator from './mediator';
import Nav from '../../components/Nav';
import WikiModal from '../../components/WikiModal';
import HistorySidebar from '../../components/HistorySidebar';

const { Footer, Content } = Layout;

const StyledFooter = styled(Footer)`
  background-color: #001529;
  text-align: center;
  color: #fff;
`;

export default function MapView() {
  return (
    <>
      <MapMediator />
      <Layout style={{ minHeight: '100vh' }}>
        <HistorySidebar />
        <Layout>
          <Nav />
          <Content>
            <WikiModal />
            <GoogleMap />
          </Content>
          <StyledFooter>&copy;Jakub Szóstko 2021</StyledFooter>
        </Layout>
      </Layout>
    </>
  );
}
