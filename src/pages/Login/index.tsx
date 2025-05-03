/*
 * @Description:
 * @Author: smilechao
 * @Date: 2023-06-14 09:27:50
 * @dev:
 */
// import { Button, message, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
//import classnames from 'classnames';
import type { FormProps } from 'antd';
import { Button, Form, Input, Layout } from 'antd';
import hexSha1 from 'hex-sha1';
import JSEncrypt from 'jsencrypt';
import moment from 'moment';
import { connect, useModel } from 'umi';
import Register from './Register';
const { Content } = Layout;
type FieldType = {
  username?: string;
  password?: string;
};

const ComName: React.FC = (props: any) => {
  const [visible, setVisible] = useState(false);
  const { initialState } = useModel('@@initialState');

  //useImperativeHandle(ref, () => ({
  //lyFormRef
  //}));
  const { dispatch, login } = props;

  useEffect(() => {
    // 请求公钥匙
    dispatch &&
      dispatch({
        type: 'login/getPublicKey',
        payload: {
          timestamp: moment().unix(),
          projectName: 'task-manager',
        },
      });
  }, []);

  // TODO
  // 请求 后端返回jwt 后面每个请求都要带上 Authorization header 带上 jwt
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    let encrypt = new JSEncrypt();
    encrypt.setPublicKey(login.publicKey);
    let encryptPassword = encrypt.encrypt(values.password); //password为需要加密的字段
    let username = values.username.trim();
    let timestamp = new Date().getTime();
    let arr = [
      'username=' + username,
      'password=' + encryptPassword,
      'timestamp=' + timestamp,
    ];
    let digest = hexSha1(arr.join(','));
    console.log(dispatch, 'dispatch');
    dispatch &&
      dispatch({
        type: 'login/tryLogin',
        payload: {
          username,
          password: encryptPassword,
          timestamp,
          digest,
        },
      });
  };

  return (
    <div className="bg-white flex justify-center items-center flex-col h-screen w-full">
      <div className="p-4 font-bold text-xl">{initialState.name}</div>
      <div>
        <Form
          name="login"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ width: 330 }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="账号"
            name="username"
            rules={[{ required: true, message: '请输入账号' }]}
          >
            <Input placeholder="请输入账号" />
          </Form.Item>

          <Form.Item<FieldType>
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
            <Button
              className="ml-2"
              onClick={() => {
                setVisible(true);
              }}
            >
              注册
            </Button>
          </Form.Item>
        </Form>
      </div>
      <Register
        closeModal={() => {
          setVisible(false);
        }}
        visible={visible}
      />
    </div>
  );
};
//forwardRef(ComName);
// export default ComName;
export default connect(({ login }) => ({
  login,
}))(ComName);
