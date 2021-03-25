import React from 'react';
import { Modal } from 'antd';
import { useMapStore } from '../views/map/store';
import { emit } from '../views/map/mediator';
import * as events from '../types/mapEvents';

export default function WikiModal() {
  const [{ isModalVisible, wikiArticleTitle }] = useMapStore();

  return (
    <Modal
      title={wikiArticleTitle}
      visible={isModalVisible}
      footer={null}
      onCancel={() => emit(events.MODAL_CLOSED)}
    >
      Here a wiki article will be placed
    </Modal>
  );
}
