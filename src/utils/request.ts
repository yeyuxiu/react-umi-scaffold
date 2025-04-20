export default {
  timeout: 1000,
  // other axios options you want
  errorConfig: {
    errorHandler(err: any, opts: any) {
      console.log(err, 'err');
      console.log(opts, 'opts');
    },
    errorThrower() {
      // 接收你后端返回的数据并且需要抛出一个你自己设定的 error， 你可以在这里根据后端的数据进行一定的处理
    },
  },
  // 请求阶段的拦截器
  requestInterceptors: [
    // (url, options) =>
    //     {
    //       // do something
    //       return { url, options }
    //     },
    //   // 一个二元组，第一个元素是 request 拦截器，第二个元素是错误处理
    //   [(url, options) => {return { url, options }}, (error) => {return Promise.reject(error)}],
  ],
  // 响应阶段的拦截器
  responseInterceptors: [
    //         // 直接写一个 function，作为拦截器
    // (response) =>
    //     {
    //       // 不再需要异步处理读取返回体内容，可直接在data中读出，部分字段可在 config 中找到
    //       const { data = {} as any, config } = response;
    //       // do something
    //       return response
    //     },
    //   // 一个二元组，第一个元素是 request 拦截器，第二个元素是错误处理
    //   [(response) => {return response}, (error) => {return Promise.reject(error)}],
  ],
};
