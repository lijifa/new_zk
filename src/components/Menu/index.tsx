import { history, useLocation, useModel } from '@umijs/max';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Menu } from 'antd';
import styles from './index.less';
import { getCompanySelected } from '@/utils/format';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import IconFont from '../IconFont';

interface MenuItemType {
  key: number;
  label: string;
  path?: string;
  icon?: JSX.Element;
  children?: any;
}
interface OriginaMenuItemType {
  menuLeftId: number;
  menuName: string;
  url: string;
  menuChildList: any[];
}

// 脚手架示例组件
const IndexMenu: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const { menuItem, saveMenuItem, updateMenuApiData } = useModel('menuModel');

  const [menuData, setMenuData] = useState<any>([]);
  const [menuLocation, setMenuLocation] = useState<any>([]);
  const { pathname } = useLocation();
  const { collapsed, setCollapsed } = useModel('global');
  // 点击菜单回调
  const clickItem = async (key: string) => {
    if (menuItem.menuId === key) {
      return;
    }
    saveMenuItem(key);
    history.push('/jquery/' + key);
    return;
  };

  const icon = (index: number) => {
    // 华德智慧能源 第一个icon
    if (index === 0) {
      return (
        <IconFont
          type="icon-xiezilou"
          style={{ color: '#0CD0FA', fontSize: 18 }}
        />
      );
    } else {
      return (
        <IconFont
          type="icon-fangwu1"
          style={{
            color: '#0CD0FA',
            fontSize: 18,
          }}
        />
      );
    }
  };
  // 获取菜单
  const getMenuList = () => {
    let comData = getCompanySelected();
    if (!comData.key) {
      return;
    }

    let menuLvTwo: MenuItemType[] = [],
      menuAll: MenuItemType[] = [];
    updateMenuApiData(comData.key, pathname).then((e) => {
      let { originalData, firstItemData } = e;

      setMenuLocation(firstItemData?.menuRelation);
      originalData.forEach((item: OriginaMenuItemType, index: number) => {
        // 第一级菜单
        // menuLvOne.push({
        //     key: item.menuLeftId,
        //     icon: <UserOutlined />,
        //     label: item.menuName
        // })

        // 第二级菜单
        // menuLvTwo[item.menuLeftId] = [];

        menuLvTwo = [];
        item.menuChildList.forEach((ii) => {
          let threeMenuData = ii.menuChildList.map(
            (iii: OriginaMenuItemType) => {
              return {
                key: iii.menuLeftId,
                label: iii.menuName,
                path: iii.url,
              };
            },
          );
          if (threeMenuData.length > 0) {
            menuLvTwo.push({
              key: ii.menuLeftId,
              label: ii.menuName,
              children: threeMenuData,
            });
          } else {
            if (ii.url === '#') return;
            menuLvTwo.push({
              key: ii.menuLeftId,
              label: ii.menuName,
              path: ii.url,
            });
          }
        });

        menuAll.push({
          key: item.menuLeftId,
          icon: icon(index),
          label: item.menuName,
          children: menuLvTwo,
        });
        // menuLvTwo[item.menuId] = item.children;
      });

      setMenuData(menuAll);
    });
  };

  useEffect(() => {
    getMenuList();
  }, [initialState?.selectedCompany?.key]);

  // 点击菜单，收起其他展开的所有菜单
  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => menuLocation.indexOf(key) === -1);

    let menuKeys = _.map(menuData, 'key');
    if (menuKeys.indexOf(Number(latestOpenKey!)) === -1) {
      setMenuLocation(keys);
    } else {
      setMenuLocation(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <>
      <Menu
        //   theme="dark"
        mode="inline"
        defaultOpenKeys={menuItem.menuRelation}
        defaultSelectedKeys={[menuItem.menuId]}
        openKeys={menuLocation}
        selectedKeys={[menuItem.menuId]}
        onClick={(e) => clickItem(e.key)}
        items={menuData}
        className={styles.LeftMenu}
        onOpenChange={onOpenChange}
      />
      {React.createElement(collapsed ? RightOutlined : LeftOutlined, {
        className: `${styles.trigger}`,
        onClick: () => setCollapsed(!collapsed),
      })}
      <div className={`${styles.MenuBackgroundImg} ${styles.leftTopImg}`} />
      <div className={`${styles.MenuBackgroundImg} ${styles.rightTopImg}`} />
      <div className={`${styles.MenuBackgroundImg} ${styles.leftBotImg}`} />
      <div className={`${styles.MenuBackgroundImg} ${styles.rightBotImg}`} />
    </>
  );
};

export default IndexMenu;
