import { Tabs } from 'antd';
import React from 'react';
import { useAliveController, useHistory, useLocation } from '@umijs/max';
const { TabPane } = Tabs;
 
export default (): React.ReactElement => {
  const { pathname } = useLocation();
  const history = useHistory();
 
  // 获取缓存列表
  const { getCachingNodes, dropScope } = useAliveController();
  const cachingNodes = getCachingNodes();
 
  /**
   * 点击tab，跳转页面
   */
  const clickTab = (path: string) => {
    history.push(path);
  };
 
  /**
   * 关闭tab，销毁缓存
   */
  const editTab = (path: any) => {
    dropScope(path);
 
    // 关闭当前页面，需跳转到其他页签
    if (path === pathname) {
      const index = cachingNodes.findIndex((item) => item.name === path);
      if (index > 0) {
        history.push(cachingNodes[index - 1].name as string);
      } else {
        history.push(cachingNodes[1].name as string);
      }
    }
  };
 
  return (
    <Tabs
      type="editable-card"
      hideAdd
      size="small"
      activeKey={pathname}
      onTabClick={clickTab}
      onEdit={editTab}
    >
      {cachingNodes.map((node) => (
        <TabPane tab={node.tabName} key={node.name} closable={cachingNodes.length > 1} />
      ))}
    </Tabs>
  );
};
