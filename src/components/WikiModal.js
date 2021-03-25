import React from 'react';
import { Modal } from 'antd';
import { useMapStore } from '../views/map/store';
import { emit } from '../views/map/mediator';
import * as events from '../types/mapEvents';

export default function WikiModal() {
  const [{ isModalVisible, wikiArticleTitle, wikiArticleUrl }] = useMapStore();

  return (
    <Modal
      title={wikiArticleTitle}
      onCancel={() => emit(events.MODAL_CLOSED)}
      visible={isModalVisible}
      footer={null}
      width="80vw"
      bodyStyle={{
        height: '75vh',
      }}
    >
      <iframe
        src={wikiArticleUrl}
        title={wikiArticleTitle}
        width="100%"
        height="100%"
        style={{
          border: 'none',
        }}
      />
    </Modal>
  );
}
