// @ts-ignore
/* eslint-disable */

declare namespace API {
  type LoginResult = {
    code?: number;
    data?: any;
    msg?: string;
  };

  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };
}
