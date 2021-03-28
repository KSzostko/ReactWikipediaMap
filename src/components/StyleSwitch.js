import React from 'react';
import { Switch } from 'antd';
import { emit } from '../views/map/mediator';
import * as events from '../types/events';

export default function StyleSwitch() {
  return (
    <Switch
      onChange={checked => emit(events.MAP_STYLE_CHANGED, checked)}
      checkedChildren="☀️"
      unCheckedChildren="🌙"
    />
  );
}
