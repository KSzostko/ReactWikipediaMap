import React from 'react';
import styled from 'styled-components';
import { Layout, Input } from 'antd';

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
  return (
    <StyledHeader>
      <StyledTitle>WikipediaMap</StyledTitle>
      <StyledInput placeholder="Search..." style={{ width: 250 }} />
    </StyledHeader>
  );
}
