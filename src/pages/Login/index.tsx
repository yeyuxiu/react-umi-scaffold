/*
 * @Description:
 * @Author: smilechao
 * @Date: 2023-06-14 09:27:50
 * @dev:
 */
// import { Button, message, Upload } from 'antd';
import React, { useEffect } from 'react';
//import classnames from 'classnames';
// import { history } from 'umi';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
//import moment from 'moment';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const ComName: React.FC = () => {
  //useImperativeHandle(ref, () => ({
  //lyFormRef
  //}));
  //const {} = props

  useEffect(() => {}, []);

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
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

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        label={null}
      >
        <Checkbox defaultChecked={false}>自动登录</Checkbox>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          登录
        </Button>
        <Button>注册</Button>
      </Form.Item>
    </Form>
  );
};
//forwardRef(ComName);
export default ComName;
//export default connect(({ test }) => ({
//...test
//}))(ComName);
