import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Popover, Modal } from 'antd';

const Dot = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: cadetblue;
`;

export default function Place({ article }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { title } = article;

  function showModal() {
    setIsModalVisible(true);
  }

  function hideModal() {
    setIsModalVisible(false);
  }

  return (
    <>
      <Popover title={title} content="Click to see the details">
        <Dot onClick={showModal} />
      </Popover>

      <Modal
        title={title}
        visible={isModalVisible}
        onOk={hideModal}
        onCancel={hideModal}
      >
        Here a wiki article will be placed
      </Modal>
    </>
  );
}

Place.propTypes = {
  article: PropTypes.object.isRequired,
};
