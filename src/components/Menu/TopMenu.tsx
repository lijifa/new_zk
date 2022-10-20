import { getTopMenuData } from '@/services/zg-base/common';
import { topMenuflat } from '@/utils/format';
import { getStorageItems, setStorageItems } from '@/utils/storageTool';
import { history, useModel, useParams } from '@umijs/max';
import { Drawer } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.less';
const TopMenu: React.FC = (props: any) => {
  const { isShow, isShowFun } = props;
  const { menuItem } = useModel('menuModel');
  const [menuTopData, setMenuTopData] = useState<any>([]);
  const { id } = useParams();

  // 请求头部导航数据
  const ListData = async () => {
    if (typeof menuItem.menuId !== 'undefined') {
      let StorgeItem = getStorageItems('MENU_INFO_CACHE');
      let menuList = await getTopMenuData(
        Number(id) || Number(menuItem.menuId),
      );

      setMenuTopData(menuList.data);
      if (id == undefined) return;
      StorgeItem[id].TopChildren = topMenuflat(menuList.data);
      setStorageItems('MENU_INFO_CACHE', StorgeItem);
    }
  };

  const HandleClick = (navObj: any) => {
    // 点击跳转
    history.push('/jquery/' + navObj.menuLeftId + '/' + navObj.menuNavId);
    // 点击关闭
    setTimeout(() => {
      isShowFun();
    }, 100);
    return;
  };

  const createTopMenu = () => {
    let menuTopTpl = menuTopData.map((item: any, key: number) => {
      return (
        <li key={key}>
          <span className={styles.title}>{item.menuName}</span>
          {item.menuChildList.map((ChildrenItem: any, kk: number) => {
            return (
              <span key={kk}>
                <a
                  onClick={() => HandleClick(ChildrenItem)}
                  data-url={ChildrenItem.url}
                >
                  {ChildrenItem.menuName}
                </a>
              </span>
            );
          })}
        </li>
      );
    });
    return menuTopTpl;
  };

  useEffect(() => {
    ListData();
  }, [menuItem.menuId]);
  return (
    <Drawer
      title={null}
      placement="top"
      width={500}
      closable={false}
      destroyOnClose={true}
      // onClose={onClose}
      open={isShow}
    >
      <div className={styles.hidennavBar}>
        <ul>{createTopMenu()}</ul>
        <img
          src="/image/subHead/hidebavbar-close.png"
          className={styles.closeBtn}
          onClick={() => isShowFun()}
        ></img>
      </div>
    </Drawer>
  );
};
export default TopMenu;
