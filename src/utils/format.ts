import { getStorageItems, setStorageItems } from './storageTool';

// 菜单扁平化
export function menuflat(menuData: any, res: { [propName: number]: any } = {}) {
  if (!menuData) {
    return [];
  }
  menuData.forEach(
    (item: {
      menuName: any;
      url: string;
      menuId: number;
      parentId: number;
      ancestors: string;
      children: any[];
      menuType: string;
    }) => {
      // 处理菜单关系
      let menuRelationArr: string[] = [];
      item.ancestors.split(',').forEach((i) => {
        if (i !== '0' && i !== '1') {
          menuRelationArr.push(i);
        }
      });

      // 处理当前真实路由
      let reg = RegExp(/.html/);
      let r_path =
        item.url && reg.test(item.url)
          ? '/jquery/' + item.menuId
          : item.url;
      let resItem = {
        menuId: item.menuId.toString(),
        menuPid: item.parentId.toString(),
        menuName: item.menuName,
        menuRelation: menuRelationArr,
        url: item.url && item.url[0] === '/' ? item.url : '/' + item.url,
        routePath: r_path,
        menuType: item.menuType,
      };
      if (item.children && item.children.length > 0) {
        res[item.menuId] = resItem;
        menuflat(item.children, res); //递归
      } else {
        res[item.menuId] = resItem;
      }
    },
  );
  return res;
}
interface menuItemType {
  menuId?: string;
  menuPid?: string;
  menuName?: string;
  menuRelation?: string[];
  url?: string;
  routePath?: string;
  menuType?: string;
}

// 获取初始的第一个菜单数据【递归】
export function getFirstMenuItem(mData: any): menuItemType {
  if (!mData || typeof mData !== 'object') {
    return {};
  }
  let firstMenuItem = {};
  if (mData.children && mData.children.length > 0) {
    return getFirstMenuItem(mData.children[0]);
  } else {
    let menuRelationArr: string[] = [];
    mData.ancestors.split(',').forEach((i: string) => {
      if (i !== '0' && i !== '1') {
        menuRelationArr.push(i);
      }
    });
    // 处理当前真是路由
    let reg = RegExp(/.html/);
    let r_path =
      mData.url && reg.test(mData.url)
        ? '/jquery/' + mData.menuId
        : mData.url;

    firstMenuItem = {
      menuId: mData.menuId.toString(),
      menuPid: mData.parentId.toString(),
      menuName: mData.menuName,
      menuRelation: menuRelationArr,
      url: mData.url && mData.url[0] === '/' ? mData.url : '/' + mData.url,
      routePath: r_path,
      menuType: mData.menuType,
    };

    return firstMenuItem;
  }
}

// 对用户选择的公司列表数据处理
export function saveCompanySelected(selectKey: number) {
  let comData = getStorageItems('COMPANY_INFO_CACHE');
  let comResult: { key: number; label: string; is_selected: number }[] = [];
  comData.forEach((item: { label: string; key: number }) => {
    comResult.push({
      key: item.key,
      label: item.label,
      is_selected: item.key === selectKey ? 1 : 0,
    });
  });
  setStorageItems('COMPANY_INFO_CACHE', comResult);
  return comResult;
}

// 对公司列表数据处理
export function getCompanySelected() {
  let comData = getStorageItems('COMPANY_INFO_CACHE');
  let comResult: { key: number; label: string; is_selected: number } = {
    key: 0,
    label: '--',
    is_selected: 0,
  };
  if (!comData) {
    return comResult
  }

  comData.forEach(
    (item: { label: string; key: number; is_selected: number }) => {
      if (item.is_selected === 1) {
        comResult = item;
      }
    },
  );
  return comResult;
}

// 顶部菜单扁平化处理
export function topMenuflat(data: any) {
  let resArr: any = {};
  data.forEach((item: { children: any[] }) => {
    if (item.children && item.children.length > 0) {
      item.children.forEach((i) => {
        resArr[i.menuNavId] = i;
      });
    }
  });
  return resArr;
}



//==========================================================
// 格式化智控菜单：返回格式化后的菜单，及初始化菜单ID
export function zkMenuFormat(zkMenuList: any[]) {
  let resMenu:any = {};
  let resMenuLv1:{ label: string; key: number }[] = [];
  let menuLvFristId = 0;
  // 转换JSON结构
  zkMenuList.map((item, index) => {
    if (index === 0) {
      menuLvFristId = item.menuId;
    }
      resMenu[item.menuId] = item.children;
      resMenuLv1.push({
        key: item.menuId,
        label: item.menuName,
      })
  })

  // setStorageItems('MENU_INFO_CACHE', resMenu);
  return {
    menuAll: resMenu,
    menuLv1Data: resMenuLv1,
    menuLv2Data: resMenu[menuLvFristId],
    menuLvFristId: menuLvFristId
  };
}