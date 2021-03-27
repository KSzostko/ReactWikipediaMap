import React, { useState } from 'react';
import { ReadOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { useMapStore } from '../views/map/store';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function HistorySidebar() {
  const [{ articles }] = useMapStore();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const readArticles = articles.filter(({ marked }) => marked);

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
      <Menu theme="dark" mode="inline" style={{ marginTop: '32px' }}>
        <SubMenu key="sub" icon={<ReadOutlined />} title="Read">
          {readArticles.map(({ pageid, title }) => (
            <Menu.Item key={pageid}>{title}</Menu.Item>
          ))}
        </SubMenu>
      </Menu>
    </Sider>
  );
}
