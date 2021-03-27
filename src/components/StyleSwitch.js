import React from 'react';
import { Switch } from 'antd';

export default function StyleSwitch() {
  function handleChange(checked) {
    console.log(checked);
  }

  return (
    <Switch
      onChange={handleChange}
      checkedChildren="☀️"
      unCheckedChildren="🌙"
    />
  );
}
