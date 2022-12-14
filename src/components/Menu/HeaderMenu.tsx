import { getCompanySelected } from '@/utils/format';
import { useLocation, useModel } from '@umijs/max';
import React, { useEffect, useState } from 'react';
import IconFont from '../IconFont';
import styles from './HeaderMenu.less';

// 头部菜单组件
const IndexMenu: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { updateMenuApiData, menuLv1Id, setMenuLv1Id } = useModel('menuModel');
  const { pathname } = useLocation();
  const [menuLv1Data, setMenuLv1Data] = useState<any>([]);
  //   const { collapsed, setCollapsed } = useModel('global');
  // 点击菜单回调
  const clickItem = async (key: number) => {
    setMenuLv1Id(key);
    // if (menuItem.menuId === key) {
    //   return;
    // }
    // saveMenuItem(key);
    // history.push('/jquery/' + key);
    return;
  };

  const iconFun = (iconStr: string, flag: boolean = false) => {
    return (
      <IconFont
        type={iconStr}
        style={{
          color: flag ? '#FFFFFF' : '#0CD0FA',
          fontSize: 18,
        }}
      />
    );
  };
  // 获取菜单
  const getMenuList = () => {
    let comData = getCompanySelected();
    if (!comData.key) {
      return;
    }

    updateMenuApiData(comData.key, pathname).then((e) => {
      let { menuLv1Data } = e;
      setMenuLv1Data(menuLv1Data);
    });
  };

  useEffect(() => {
    getMenuList();
  }, [initialState?.selectedCompany?.key]);

  // 遍历一级菜单
  const getMenuLv1 = () => {
    let tempArr: JSX.Element[] = [];

    menuLv1Data.forEach(
      (
        item: {
          icon: string;
          key: number;
          label: string;
        },
        index: number,
      ) => {
        if (item.key === menuLv1Id) {
          tempArr.push(
            <li
              className={styles.active}
              key={index}
              onClick={() => clickItem(item.key)}
            >
              {iconFun(item.icon, true)}
              <span className={styles.title}>{item.label}</span>
            </li>,
          );
        } else {
          tempArr.push(
            <li key={index} onClick={() => clickItem(item.key)}>
              {iconFun(item.icon)}
              <span className={styles.title}>{item.label}</span>
            </li>,
          );
        }
      },
    );
    return tempArr;
  };

  return (
    <>
      <div className={styles.headerNav}>
        <ul>{getMenuLv1()}</ul>
      </div>
      <div className={styles.navBarLine}></div>
    </>
  );
};

export default IndexMenu;
