import React from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';

const { Header } = Layout;

const StyledTitle = styled.h1`
  font-size: 24px;
  color: #fff;
  font-weight: 600;
`;

export default function Nav() {
  return (
    <Header>
      <StyledTitle>WikipediaMap</StyledTitle>
    </Header>
  );
}
