import { useState } from 'react';

export default () => {
  const [collapsed, setCollapsed] = useState<any>(false);

  return {
    collapsed,
    setCollapsed,
  };
};
