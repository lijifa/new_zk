import { request } from '@umijs/max';
/** 获取天气接口数据 */
export async function getWeatherBySiteId(siteId: number, options?: { [key: string]: any }) {

    return request('/wisdom/common/selectWeatherBySiteId', {
      method: 'POST',
      data: {siteId: siteId},
      ...(options || {}),
    });
}

/** 获取当前用户菜单 /apis/getMenuData */
export async function getMenuData(mfrsId: number, options?: { [key: string]: any }) {
  return request('/wisdom/menu/selectZgMenuLeftListByMfrsId', {
    method: 'GET',
    params: {mfrsId: mfrsId},
    ...(options || {}),
  });
}
/** 获取当前菜单的顶部导航 /apis/getMenuData */
export async function getTopMenuData(menuLeftId: number, options?: { [key: string]: any }) {
  return request('/wisdom/menu/selectZgMenuNavListByMenuLeftId', {
    method: 'GET',
    params: {menuLeftId: menuLeftId},
    ...(options || {}),
  });
}