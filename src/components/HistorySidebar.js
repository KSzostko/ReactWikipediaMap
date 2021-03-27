import React, { useState, useEffect } from 'react';
import { ReadOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useMapStore } from '../views/map/store';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function HistorySidebar() {
  const [{ articles }, { setMapCenter }] = useMapStore();
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [readArticles, setReadArticles] = useState([]);

  useEffect(() => {
    const newArticles = articles.filter(({ marked }) => marked);
    setReadArticles(newArticles);
  }, [articles]);

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
          {readArticles.map(({ pageid, title, lat, lon }) => (
            <Menu.Item key={`${pageid},${lat},${lon}`}>{title}</Menu.Item>
          ))}
        </SubMenu>
      </Menu>
    </Sider>
  );
}
