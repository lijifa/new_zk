// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 登录接口 POST /apis/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  // var dataTmp = new FormData();
  //     Object.keys(body).forEach(keyItem => {
  //       dataTmp.append(keyItem, body[keyItem]);
  //     })
  return request<API.LoginResult>('/login', {
    method: 'POST',
    // headers: {
    //   // 'Content-Type': 'application/json',
    //   'Content-Type': 'application/x-www-form-urlencoded',
    // },
    data: body,
    ...(options || {}),
  });
}

/** 退出登录接口 POST /apis/logout */
export async function outLogin(options?: { [key: string]: any }) {
  return request('/logout', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 判断Token是否有效 POST /apis/hasAccessToken */
export async function hasAccessToken(options?: { [key: string]: any }) {
  return request('/hasAccessToken', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 获取当前的用户所属企业列表 GET /apis/companyList */
export async function companyList(options?: { [key: string]: any }) {
  return request('/user/mfrs/list', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 更新mfrsId POST /apis/updateMfrsId */
export async function updateMfrsId(mfrsId: number, options?: { [key: string]: any }) {
  return request('/updateMfrsId/'+mfrsId, {
    method: 'POST',
    data: {mfrsId: mfrsId},
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