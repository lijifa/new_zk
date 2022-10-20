// 菜单和导航标签交互操作
import { useState, useCallback } from 'react';
import { getStorageItems, setStorageItems } from '@/utils/storageTool';
import { menuflat, getFirstMenuItem } from '@/utils/format';
import { getMenuData } from '@/services/zg-base/login';

// 单个菜单项的数据类型
interface menuItemType {
  iframeUrl?: string | undefined;
  menuId: string;
  menuPid: string;
  menuName: string;
  menuRelation: string[];
  url?: string;
  routePath?: string;
  menuType?: string
}

// 单个标签项的数据类型
interface tagDataType {
  key: string;
  label: string;
  path: string;
}

export default () => {
  const [menuApiData, setMenuApiData] = useState<any>([]);
  const [menuItem, setMenuItem] = useState<menuItemType>({
    menuId: '',
    menuPid: '',
    menuName: '',
    menuRelation: [],
    url: '',
    routePath: '',
    menuType: '',
  });

  const [tags, setTags] = useState<tagDataType[]>([]);

  // 添加标签
  const addTag = (tagData: tagDataType) => {
    console.log('-----------addTag-------------');
    console.log(tagData);
    tags.push(tagData);
    setTags(tags);
  };

  // 删除标签
  const removeTag = (id: string) => {
    console.log('-----------removeTag-------------');
    console.log(id);
    tags.splice(
      tags.findIndex((item) => item.key === id),
      1,
    );
    setTags(tags);
  };

  // 获取初始的第一个菜单数据
  const getFirstItem = useCallback((mData: any) => {
    if (!mData || typeof mData !== 'object') {
      return;
    }

    let res = getFirstMenuItem(mData);
    setMenuItem(res);
  }, []);

  // 获取当前用户所有菜单
  const updateMenuApiData = async (mfrsId: number, pathname = '') => {
    let res = await getMenuData(mfrsId);
    // 缓存请求过来的菜单原始数据
    setMenuApiData(res.data);

    let menuSave;
    let first = getFirstMenuItem(res.data[0]);
    // 如果不为空说明当前操作是刷新（刷新不用更新菜单缓存）
    if (pathname === '' || pathname === '/home') {
      // 设置应用菜单扁平化并本地缓存
      menuSave = menuflat(res.data);
      setStorageItems('MENU_INFO_CACHE', menuSave);
      // first = getFirstMenuItem(res.data[0]);
      setMenuItem(first);
    } else {
      menuSave = getStorageItems('MENU_INFO_CACHE');
      Object.values(menuSave).forEach((item: any) => {
        if (item.routePath === pathname) {
          first = item;
          setMenuItem(item);
        }
      });
    }

    return {
      originalData: res.data,
      firstItemData: first,
    };
  };

  // 存储当前点击菜单项
  const saveMenuItem = useCallback((id: string) => {
    let menuData = getStorageItems('MENU_INFO_CACHE');

    if (id && menuData[id]) {
      setMenuItem(menuData[id]);
    } else {
      Object.values(menuData).forEach((item: any) => {
        if (item.routePath === id) {
          setMenuItem(item);
        }
      });
    }
  }, []);

  const addTagFun = useCallback((e: tagDataType) => addTag(e), []);
  const removeTagFun = useCallback((e: string) => removeTag(e), []);

  const [counter, setCounter] = useState(0);

  const increment = useCallback(() => setCounter((c) => c + 1), []);
  const decrement = useCallback(() => setCounter((c) => c - 1), []);

  return {
    counter,
    increment,
    decrement,
    tags,
    addTagFun,
    removeTagFun,
    menuItem,
    saveMenuItem,
    getFirstItem,
    updateMenuApiData,
    menuApiData,
  };
};
