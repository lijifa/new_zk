// /components/KeepAvlieTabs/Tab.tsx
import { CloseCircleOutlined } from '@ant-design/icons';
import { history, useLocation, useModel } from '@umijs/max';
import { useAliveController } from 'react-activation';
import styles from './index.less';
import type { CachingNode } from './type';

export default function Tab({ node }: { node: CachingNode }) {
  const { saveMenuItem, tags } = useModel('menuModel');
  // const history = useHistory();
  const { pathname } = useLocation();
  // 同上，dropScope是释放节点，点删除后删掉当前节点信息
  const { getCachingNodes, dropScope } = useAliveController();
  const cachingNodes: CachingNode[] | any[] = getCachingNodes();

  // 执行tab的删除操作
  function dropTab(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    // // 如果关闭激活中的 KeepAlive Tab，需要先离开当前路由
    // // 触发 KeepAlive unactivated 后再进行 drop
    // if (location.pathname === node.path) {
    //   // 路由异步加载控制
    //   const unlisten = history.listen(() => {
    //     setTimeout(() => {
    //       dropScope(node.name as string | RegExp);
    //     }, 30);
    //   });
    //   unlisten();
    //   // 前往排除当前 node 后的最后一个 tab
    //   if (cachingNodes.length <= 1) {
    //     history.push('/');
    //   } else {
    //     const { path } = cachingNodes.filter((item) => item.path !== node.path).pop();
    //     history.push(path);
    //   }
    // } else {
    //   dropScope(node.name as string | RegExp);
    // }

    let nodePath = node.path; // 当前页面存于缓存中的节点Path
    // let pathname = location.pathname;  // 当前路由中的节点

    //dropScope是释放节点，点删除后删掉当前节点信息
    setTimeout(() => {
      dropScope(nodePath);
      // clear()
    }, 100);

    // 关闭当前页面，需跳转到其他页签
    if (nodePath === pathname) {
      const index = cachingNodes.findIndex((item) => item.path === nodePath);

      if (index > 0) {
        history.push(cachingNodes[index - 1].path as string);
      } else {
        history.push('/');
      }
    }
  }

  // 点击切换选项卡
  function clickItem(key: any) {
    console.log('tags^^^^^^^^^^^^^^');
    console.log(tags);
    saveMenuItem(tags[key].path);
    history.push(tags[key].path);
  }

  // 设置当前tab的样式
  const className = () => {
    if (pathname === node.path) {
      if (pathname === '/home') {
        return `${styles.home_active} ${styles.active} `;
      }
      return `${styles.active}`;
    }
    if (pathname === '/home') {
      return `${styles.home_active}`;
    }
    return `${styles.deactive}`;
  };

  return (
    <li className={className()} onClick={clickItem}>
      <div className="tags-nav">
        <span>{node.label}</span>
        {pathname === '/home' ? null : (
          <CloseCircleOutlined
            className={styles['close-btn']}
            onClick={dropTab}
          />
        )}
      </div>
    </li>
  );
}
