import { CloseCircleFilled } from '@ant-design/icons';
import { history, useLocation, useModel } from '@umijs/max';
import styles from './index.less';

const Tab = () => {
  const { tags, removeTagFun } = useModel('menuModel');
  // 本地路由信息
  const location = useLocation();
  // 切换菜单
  const onClick = (path: string) => {
    history.push(path);
  };

  // 关闭菜单
  const onClose = (e: any, id: string) => {
    e.stopPropagation();
    const items = tags.findIndex((item) => item.key === id);
    if (items > 0) {
      history.push(tags[items - 1].path);
    } else {
      history.push('/home');
    }
    removeTagFun(id);
  };

  // 遍历当前标签模板
  const tagBtnList = () => {
    return tags.map((item: any, index: any) => {
      return (
        <li
          key={index}
          className={`${styles.tabItem} ${
            location.pathname === item.path && location.pathname !== '/home'
              ? styles.active
              : ''
          }`}
          onClick={() => onClick(item.path)}
        >
          <span>{item.label}</span>
          <CloseCircleFilled
            style={{ fontSize: 12, marginLeft: 5 }}
            onClick={(e) => onClose(e, item.key)}
          />
        </li>
      );
    });
  };

  return <>{tagBtnList()}</>;
};

export default Tab;
