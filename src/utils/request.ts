import { request } from '@umijs/max';
import { message } from 'antd';
import type { RequestConfig } from 'umi';
import {history} from 'umi'

// 登录后的信息，可以放在请求头
const headersConfig = {
  'X-Requested-With': 'XMLHttpRequest',
  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  Accept: 'application/json',
  // gatewayAppId:'' // 网关配置
};

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  success: boolean;
  data: any;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

// 运行时 request 配置
export const requestConfig: RequestConfig = {
  timeout: 1000,
  withCredentials: true,
  headers: headersConfig,
  errorConfig: {
    errorThrower: (res: ResponseStructure) => {
      // 不知道为什么请求不走这里
      console.log(res, '不知道为什么请求不走这里');
    },
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // if (error.name === 'AxiosError') {
      if (error.response.status === 500 && error.response.data.message) {
        message.error(error.response.data.message);
      } else if (error.response.status === 302) {
        message.warning("身份验证失效，请重新登陆")
        history.push('/login')
      } else {
        message.error('服务器异常！');
      }
    },
  },
  // 请求阶段的拦截器
  requestInterceptors: [
    (url, options) => {
      const token = sessionStorage.getItem('token');
      // 有token请求头带上token，没token自动跳登陆业
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: 'Bearer ' + token,
        };
      } else {
        history.push("/login")
      }
      return { url, options };
    },
    //   // 一个二元组，第一个元素是 request 拦截器，第二个元素是错误处理
    //   [(url, options) => {return { url, options }}, (error) => {return Promise.reject(error)}],
  ],
  // 响应阶段的拦截器
  responseInterceptors: [
    // (response:any) => {
    //   const { data } = response;
    //   console.log(response, 'response');
    //   console.log(data, 'data');
    //   return response;
    // }
    //   // 一个二元组，第一个元素是 request 拦截器，第二个元素是错误处理
    //   [(response) => {return response}, (error) => {return Promise.reject(error)}],
  ],
};

// 自定义请求

/**
 * get 请求
 * @param url 请求地址
 * @param params 传参
 * @param config request其余配置
 */
export const getReq = (
  url: string,
  params: any = {},
  config: any = {},
): Promise<any> => {
  return request(url, {
    method: 'GET',
    params,
    ...config,
  });
};

/**
 * post 请求
 * @param url 请求地址
 * @param data 传参
 * @param config request其余配置
 */
export const postReq = (
  url: string,
  data: any = {},
  config: any = {},
): Promise<any> => {
  return request(url, {
    method: 'POST',
    data,
    ...config,
  });
};

/**
 * 特殊返回类型处理
 * responseType: deafult(json , text)
 * blob , formData , document, arraybuffer
 */
export const getRespType = (
  url: string,
  data: any = {},
  responseType: string,
  config: any = {},
): Promise<any> => {
  return request(url, {
    method: 'GET',
    data,
    responseType,
    ...config,
  });
};
