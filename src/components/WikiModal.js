import React from 'react';
import { Modal, Button } from 'antd';
import { useMapStore } from '../views/map/store';
import { emit } from '../views/map/mediator';
import * as events from '../types/mapEvents';

export default function WikiModal() {
  const [{ isModalVisible, wikiArticle }] = useMapStore();
  const { title, url } = wikiArticle;

  const footer = [
    <Button
      type="primary"
      onClick={() => emit(events.ARTICLE_MARKED, wikiArticle)}
    >
      Mark as read
    </Button>,
    <Button key="back" onClick={() => emit(events.MODAL_CLOSED)}>
      Cancel
    </Button>,
  ];

  return (
    <Modal
      centered
      title={title}
      onCancel={() => emit(events.MODAL_CLOSED)}
      visible={isModalVisible}
      footer={footer}
      width="80vw"
      bodyStyle={{
        height: '75vh',
      }}
    >
      <iframe
        src={url}
        title={title}
        width="100%"
        height="100%"
        style={{
          border: 'none',
        }}
      />
    </Modal>
  );
}
