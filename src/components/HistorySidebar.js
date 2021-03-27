import React, { useState } from 'react';
import { Layout } from 'antd';

const { Sider } = Layout;

export default function HistorySidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

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
      Siema
    </Sider>
  );
}
