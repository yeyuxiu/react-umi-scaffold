/*
 * @Author: yeyuxiu
 * @Date: 2025-04-28 15:14:37
 * @LastEditors: yeyuxiu
 * @LastEditTime: 2025-05-03 11:14:37
 * @Description: 登陆逻辑
 */
import { getPublicKey, login } from '@/services/login';
import { message } from 'antd';
import { history } from 'umi';
export default {
  namespace: 'login',
  state: {
    publicKey: '', // 公钥
    token: '', // 返回的jwt
    authorization: '', // 目录权限
    currentUser: '', // 用户信息
  },

  // subscriptions: {
  //     setupHistory({ history, dispatch }) {
  //       // 监听 history 变化，没登录就跳到/login
  //       return history.listen(({ pathname, search }) => {

  //       });
  //     },
  //   },

  effects: {
    *getPublicKey({ payload }, { call, put, select }) {
      const res = yield call(getPublicKey, payload);
      const info = yield select((state: any) => state.login);
      const { success, data } = res;
      if (success) {
        // message.success('获取公钥成功');
        yield put({ type: 'setData', payload: { ...info, publicKey: data } });
      }
    },

    *tryLogin({ payload }, { call, put, select }) {
      try {
        const res = yield call(login, payload);
        const info = yield select((state: any) => state.login);
        const { success, data } = res;
        if (success) {
          message.success('登陆成功');
          // 从state中获取当前登录状态
          yield put({ type: 'setData', payload: { ...info, data } });
          sessionStorage.setItem('token', data.token);
          history.push('/taskManager');
        }
      } catch {}
    },

    *logout({ payload }, { call, put, select }) {
      sessionStorage.clear();
      yield put({
        type: 'setData',
        payload: {
          publicKey: '',
          token: '',
          authorization: '',
          currentUser: '',
        },
      });
      history.push('/login');
    },
  },

  reducers: {
    setData(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
