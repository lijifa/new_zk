import { notification } from 'antd';
import { history, RequestConfig } from '@umijs/max';
 
// /** 异常处理程序 */
// const codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
// //   ........ 可以继续添加接口错误信息
// };
 
// const errorHandler = (error: any) => {
//   const { response } = error;
//   if (response && response.status) {
//     const errorText = codeMessage[response.status] || response.statusText;
//     const { status, url } = response;
//     notification.error({
//       message: `请求错误 ${status}: ${url}`,
//       description: errorText,
//     });
//   } else if (!response) {
//     notification.error({
//       description: '网络异常，无法连接服务器',
//       message: '网络异常',
//     });
//   }
//   return response;
// };
 
// //对 extend 实例进行简单的封装
// const request = extend({
//   prefix: 'http://localhost:3000',  // 统一的请求前缀
//   timeout: 3000,                    // 超时时间
//   headers: {                        // headers中搭载token等请求头信息
//     'Content-Type': 'application/x-www-form-urlencoded',
//     Authentication: localStorage.getItem('token') || '',
//   },
//   //处理请求错误 调用上面的错误处理逻辑
//   errorHandler: errorHandler,
// });
 
 
// // 对实例request进行请求拦截
// // 可以在里面对url、option中的参数进行进一步处理
// request.interceptors.request.use((url, options) => {
//   return {
//     options: {
//       ...options,
//       interceptors: true,
//     },
//   };
// });
 
// // 对实例request进行响应拦截, 统一处理接口错误信息
// request.interceptors.response.use(async (response) => {
//   if (response.status !== 200) {
//     switch (response.status) {
//       case 401:
//         notification.warn({
//           message: '登录超时，请重新登陆!',
//         });
//         history.push('/login');
//         break;
//     }
//   }
//   return response;
// });






// 错误处理方案： 错误类型
// enum ErrorShowType {
//   SILENT = 0,
//   WARN_MESSAGE = 1,
//   ERROR_MESSAGE = 2,
//   NOTIFICATION = 3,
//   REDIRECT = 9,
// }
// 与后端约定的响应数据格式
interface ResponseStructure {
  // success: boolean;
  data: any;
  code?: number;
  msg?: string;
  // showType?: ErrorShowType;
}
 
// 运行时配置
export const request: RequestConfig = {
  // 统一的请求设定
  timeout: 3000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest',
    Authentication: localStorage.getItem('token') || '',
  },
 
  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出
    errorThrower: (res: ResponseStructure) => {
      const { data, code, msg } = res;
      if (code !== 0) {
        const error: any = new Error(msg);
        error.name = 'BizError';
        error.info = { code, msg, data };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { msg, code } = errorInfo;
          switch (code) {
            case 0:
              // do nothing
              break;
            default:
              notification.error({message: msg});
          }
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        console.log('response ==== error');
        console.log(error);
        
        notification.error({message: 'Response status:+202'});
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        notification.error({message: 'None response! Please retry.'});
      } else {
        // 发送请求时出了点问题
        notification.error({message: 'Request error, please retry.'});
      }
    },
 
  },
 
  // 请求拦截器
  requestInterceptors: [
    (config) => {
    // 拦截请求配置，进行个性化处理。
      const url = config.url.concat('?token = 123');
      return { ...config, url};
    }
  ],
 
  // 响应拦截器
  responseInterceptors: [
    (response) => {
       // 拦截响应数据，进行个性化处理
       const { data } = response;
       if(data.code !== 0){
        notification.error({message: '请求失败！'});
       }
       return response;
    }
  ]
};