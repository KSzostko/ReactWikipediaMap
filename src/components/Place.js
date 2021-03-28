import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Popover } from 'antd';
import { emit } from '../views/map/mediator';
import * as events from '../types/events';

const Dot = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ marked }) => (marked ? '#237bffe0' : '#fa8c16')};
  box-shadow: 0px 0px 5px ${({ marked }) => (marked ? '#698bff' : '#ffa769')};
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
  const { title, pageid, marked, lat, lon } = article;

  return (
    <>
      <Popover title={title} content="Click to see the details">
        <Dot
          marked={marked}
          onClick={() => emit(events.MARKER_CLICKED, { pageid, lat, lon })}
        />
      </Popover>
    </>
  );
}

Place.propTypes = {
  article: PropTypes.object.isRequired,
};
