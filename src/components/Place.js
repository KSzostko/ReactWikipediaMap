import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Popover } from 'antd';
import { useMapStore } from '../views/map/store';

const Dot = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fa8c16;
  opacity: 0.7;
  transition: all 0.2s ease-in;
  cursor: pointer;
  transform: scale(0.95);

  &:hover {
    opacity: 1;
    transform: scale(1);
  }
`;

export default function Place({ article }) {
  const [, { setModalVisible }] = useMapStore();
  const { title } = article;

  return (
    <>
      <Popover title={title} content="Click to see the details">
        <Dot onClick={() => setModalVisible(true)} />
      </Popover>
    </>
  );
}

Place.propTypes = {
  article: PropTypes.object.isRequired,
};
