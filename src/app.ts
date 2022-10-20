// 运行时配置
import type { RequestConfig } from '@umijs/max';
import { history, useParams } from '@umijs/max';
import { message } from 'antd';
import { hasAccessToken, outLogin } from './services/zg-base/login';
import { clearStorageAll, getStorageItems } from '@/utils/storageTool';
import { getCompanySelected } from '@/utils/format';
// import queryString from 'query-string';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
import URLSearchParams from 'querystring';
const loginPath = '/login';
export async function getInitialState(): Promise<{
  currentUser?: any;
  currentCompany?: any;
  isLogin?: boolean;
  selectedCompany?: { key: number; label: string };
  tagMenuData?: any;
}> {
  const getLoginStatus = async () => {
    try {
      const res = await hasAccessToken();
      return res.code === 0;
    } catch (error) {
      // 退出
      outLogin();

      history.replace(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (history.location.pathname !== loginPath) {
    const currentLoginState = await getLoginStatus();
    let userData = getStorageItems('USER_INFO_CACHE')
      ? getStorageItems('USER_INFO_CACHE')
      : {};
    let companyObj = getCompanySelected();

    // 判断当前是否已登录
    if (!currentLoginState || companyObj.key === 0 || !userData.userId) {
      history.replace(loginPath);
      return {
        isLogin: false,
        currentUser: {},
        currentCompany: [],
        selectedCompany: companyObj,
        tagMenuData: [],
      };
    }

    // 设置
    return {
      isLogin: currentLoginState,
      currentUser: getStorageItems('USER_INFO_CACHE'),
      currentCompany: getStorageItems('COMPANY_INFO_CACHE'),
      selectedCompany: companyObj,
      tagMenuData: [],
    };
  }

  // 默认
  return {
    isLogin: false,
    currentUser: {},
    currentCompany: [],
    selectedCompany: { key: 0, label: '--' },
    tagMenuData: [],
  };
}

// export const layout = () => {
//   return {
//     title: 'lijifa',
//     logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
//     menu: {
//       locale: false,
//     },
//   };
// };

// 判断路由是否是存在
const GetJqueryHistory = () => {
  if (!location.pathname.split('/')[2]) return;
  let locationStorge1 = Number(location.pathname.split('/')[2]);
  let locationStorge2 = Number(location.pathname.split('/')[3]);
  let menuTmp = getStorageItems('MENU_INFO_CACHE');
  if (!menuTmp) {
    history.push('/jquery/');
  } else if (!menuTmp[locationStorge1]) {
    history.push('/jquery/');
  } else if (
    locationStorge2 &&
    !menuTmp[locationStorge1]['TopChildren'][locationStorge2]
  ) {
    history.push('/jquery/');
  }
};

// 在初始加载和路由切换时做一些事情。
export function onRouteChange() {
  GetJqueryHistory();

  // 优化u3d重复加载生成的Js
  let u3dScriptDom = document.getElementsByClassName('newU3d');

  let l = u3dScriptDom.length;
  if (u3dScriptDom && l > 0) {
    for (let i = 0; i < l; i++) {
      if (u3dScriptDom[i] !== null) {
        u3dScriptDom[i].parentNode.removeChild(u3dScriptDom[i]);
      }
    }
  }
}

// export function patchClientRoutes({ routes }) {
//   routes[1]['routes'][1].name = 'lijifa'
// }

export const request: RequestConfig = {
  // 请求前拦截器
  requestInterceptors: [
    (url: string, options: RequestConfig) => {
      // const authHeader = { Authorization: 'Bearer xxxxxx' };

      let dataTmp = options['data'];

      if (options['method'] === 'post' && options['data']) {
        dataTmp = URLSearchParams.stringify(options['data']);
        // dataTmp = new FormData();
        // Object.keys(options['data']).forEach(keyItem => {
        //   dataTmp.append(keyItem, options['data'][keyItem]);
        // })
      }

      return {
        url: `${'/apis' + url}`,
        options: { ...options, data: dataTmp },
      };
    },
  ],
  // 响应拦截器
  responseInterceptors: [
    (response: any) => {
      // response.headers.append('interceptors', 'yes yo');
      let code = response.data.code;
      let apiUrl = response.config.url;
      switch (code) {
        case 401:
          if (response.data.msg === '您已登录，请勿重复登陆') {
            message.error('您已登录，请勿重复登陆');
            const urlParams = new URL(window.location.href).searchParams;
            history.push(urlParams.get('redirect') || '/home');
            return;
          } else if (response.data.msg === '登录信息已过期') {
            message.error('登录信息已过期');
            clearStorageAll();
            history.replace('/login');
            return;
          } else {
            message.error(response.data.msg);
          }
          break;
        case 0:
          if (apiUrl === '/apis/logout') {
            clearStorageAll();
            history.replace('/login');
          }
          if (!response.data.data) {
            response.data.data = null;
          }
          return response;
          break;
        default:
          message.error(response.data.msg);
          if (!response.data || !response.data.data) {
            response.data.data = [];
          }
          return response;
          break;
      }
    },
  ],
};
