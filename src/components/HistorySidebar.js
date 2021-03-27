import React, { useState, useEffect } from 'react';
import { ReadOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useMapStore } from '../views/map/store';
import ArticlesStorage from '../services/ArticlesStorage';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function HistorySidebar() {
  const [{ isModalVisible }, { setMapCenter }] = useMapStore();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [readArticles, setReadArticles] = useState([]);

  useEffect(() => {
    const newArticles = ArticlesStorage.getReadArticles();
    setReadArticles(newArticles);
  }, [isModalVisible]);

  function handleClick({ key }) {
    const [, lat, lng] = key.split(',').map(parseFloat);
    setMapCenter({ lat, lng });
  }

  return (
    <Sider
      collapsible
      collapsedWidth={0}
      zeroWidthTriggerStyle={{
        top: '8px',
      }}
      collapsed={isCollapsed}
      onCollapse={() => setIsCollapsed(!isCollapsed)}
    >
      <Menu
        onClick={handleClick}
        theme="dark"
        mode="inline"
        style={{ marginTop: '32px' }}
      >
        <SubMenu key="sub" icon={<ReadOutlined />} title="Read">
          {readArticles.map(({ pageid, title, lat, lng }) => (
            <Menu.Item key={`${pageid},${lat},${lng}`}>{title}</Menu.Item>
          ))}
        </SubMenu>
      </Menu>
    </Sider>
  );
}
