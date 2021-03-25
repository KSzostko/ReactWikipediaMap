import React from 'react';
import { Modal } from 'antd';
import { useMapStore } from '../views/map/store';

export default function WikiModal() {
  const [{ isModalVisible }, { setModalVisible }] = useMapStore();

  return (
    <Modal
      title="test title"
      visible={isModalVisible}
      footer={null}
      onCancel={() => setModalVisible(false)}
    >
      Here a wiki article will be placed
    </Modal>
  );
}
