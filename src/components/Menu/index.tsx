import { getCompanySelected, menuflat } from '@/utils/format';
import { getStorageItems } from '@/utils/storageTool';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { history, useLocation, useModel } from '@umijs/max';
import { Menu } from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import IconFont from '../IconFont';
import styles from './index.less';

interface MenuItemType {
  key: number;
  label: string;
  path?: string;
  icon?: JSX.Element;
  children?: any;
}
interface OriginaMenuItemType {
  menuId: number;
  menuName: string;
  url: string;
  children: any[];
}

// 脚手架示例组件
const IndexMenu: React.FC = () => {
  const {
    menuItem,
    saveMenuItem,
    updateMenuApiData,
    menuLv1Id,
    addTagFun,
    tags,
  } = useModel('menuModel');

  const [menuData, setMenuData] = useState<any>([]);
  const [menuFlatData, setMenuflatData] = useState<any>({});
  const [menuLocation, setMenuLocation] = useState<any>([]);
  const { pathname } = useLocation();
  const { collapsed, setCollapsed } = useModel('global');
  // 点击菜单回调
  const clickItem = async (key: any) => {
    let res = tags.find((item) => item.key === key);
    if (res !== undefined) {
      history.push(res.path);
      return;
    }
    addTagFun({
      key,
      label: menuFlatData[key].menuName,
      path: menuFlatData[key].url,
    });
    history.push(menuFlatData[key].url);
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
    let leftMenuData = getStorageItems('MENU_INFO_CACHE');

    if (leftMenuData && leftMenuData[menuLv1Id]) {
      setMenuflatData(menuflat(leftMenuData[menuLv1Id]));
    }

    // setMenuLocation(firstItemData?.menuRelation);
    leftMenuData[menuLv1Id]?.forEach(
      (item: OriginaMenuItemType, index: number) => {
        // 第一级菜单
        // menuLvOne.push({
        //     key: item.menuId,
        //     icon: <UserOutlined />,
        //     label: item.menuName
        // })

        // 第二级菜单
        // menuLvTwo[item.menuId] = [];

        menuLvTwo = [];
        item.children.forEach((ii) => {
          let threeMenuData = ii.children.map((iii: OriginaMenuItemType) => {
            return {
              key: iii.menuId,
              label: iii.menuName,
              path: iii.url,
            };
          });
          if (threeMenuData.length > 0) {
            menuLvTwo.push({
              key: ii.menuId,
              label: ii.menuName,
              children: threeMenuData,
            });
          } else {
            if (ii.url === '#') return;
            menuLvTwo.push({
              key: ii.menuId,
              label: ii.menuName,
              path: ii.url,
            });
          }
        });

        menuAll.push({
          key: item.menuId,
          icon: icon(index),
          label: item.menuName,
          children: menuLvTwo,
        });
        // menuLvTwo[item.menuId] = item.children;

        setMenuData(menuAll);
      },
    );
  };

  useEffect(() => {
    if (menuLv1Id) {
      console.log(menuLv1Id);
      getMenuList();
    }
  }, [menuLv1Id]);

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
    </>
  );
};

export default IndexMenu;
