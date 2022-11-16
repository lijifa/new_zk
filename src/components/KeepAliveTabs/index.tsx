// /components/KeepAvlieTabs/index.tsx
import { history, useLocation, useModel } from '@umijs/max';
import { useAliveController } from 'react-activation';
import IconFont from '../IconFont';
import styles from './index.less';
import Tab from './Tab';
import type { CachingNode } from './type';

export default function KeepAliveTabs() {
  // 是否全屏
  const { full, ScreenOpen, ScreenClose } = useModel(
    'isFullModel',
    (model: any) => ({
      full: model.isFull,
      ScreenOpen: model.ScreenOpen,
      ScreenClose: model.screenClose,
    }),
  );
  const { refresh } = useAliveController();

  // history导航
  // const history = useHistory();

  // 本地路由信息
  const location = useLocation();

  // 获取缓存节点方法和信息
  const { getCachingNodes } = useAliveController();
  const cachingNodes: CachingNode[] =
    typeof getCachingNodes === 'function' ? getCachingNodes() : [];

  // 因为是异步组件，需要在这儿处理一下缓存中的重复问题
  let nodes: CachingNode[] = cachingNodes; //arrayDeduplicate(cachingNodes, 'path');

  // 首页不参与tabs切换的关闭操作
  nodes = nodes.filter((item) => item.path !== '/home');

  // 全屏
  const ScreenAll = () => {
    if (full) {
      return (
        <IconFont
          type="icon-zhankai2"
          onClick={ScreenClose}
          style={{ color: '#0ED1F9', fontSize: 20 }}
        />
      );
    } else {
      return (
        <IconFont
          type="icon-zhankai1"
          onClick={ScreenOpen}
          style={{ color: '#0ED1F9', fontSize: 20 }}
        />
      );
    }
  };

  // 页面刷新
  const Refresh = () => {
    if (!refresh) return;
    refresh(location.pathname);
  };

  return (
    <>
      <ul className={styles['alive-tabs']}>
        <li
          className={
            location.pathname === '/home'
              ? styles.home_active
              : styles.home_deactive
          }
          onClick={() => {
            history.push('/home');
          }}
        >
          <div className="tags-nav">
            <span>首页</span>
          </div>
        </li>
        {nodes.map((node, key) => (
          <Tab key={key} node={node} />
        ))}
      </ul>
      <ul className={styles.tabNavRight}>
        <li onClick={Refresh}>
          <IconFont
            type="icon-shuaxin-line"
            style={{ color: '#0ED1F9', fontSize: 20 }}
          />
        </li>
        <li>{ScreenAll()}</li>
      </ul>
    </>
  );
}
