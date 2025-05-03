/*
 * @Description: 注册页
 * @Author: smilechao
 * @Date: 2023-06-14 09:27:50
 * @dev:
 */
import { Form, Input, Modal, message } from 'antd';
import React, { useEffect, useState } from 'react';
//import classnames from 'classnames';
import { registPost } from '@/services/api';
import hexSha1 from 'hex-sha1';
import JSEncrypt from 'jsencrypt';
import { connect } from 'umi';
//import moment from 'moment';

type FieldType = {
  username?: string;
  password?: string;
};

type PropsType = {
  visible: boolean;
  closeModal: Function;
  login: any;
};

const ComName: React.FC<PropsType> = (props: PropsType) => {
  //useImperativeHandle(ref, () => ({
  //lyFormRef
  //}));

  const [form] = Form.useForm<FieldType>();
  const { visible, closeModal, login } = props;
  const [loading, setLoading] = useState(false); //

  useEffect(() => {
    console.log(login);
  }, [login]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
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

        // TODO 请求
        setLoading(true);
        registPost({
          username,
          password: encryptPassword,
          timestamp,
          digest,
        }).then((res) => {
          setLoading(false);
          if (res.code === 200) {
            message.success('注册成功');
            closeModal && closeModal();
          }
        });
      })
      .catch((info) => {
        setLoading(false);
        console.log(info, 'info');
      });
  };
  const handleCancel = () => {
    closeModal && closeModal();
  };

  return (
    <Modal
      title="注册账号"
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="注册"
      okButtonProps={{ loading: loading }}
    >
      <Form
        form={form}
        name="register"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 16 }}
        //   style={{ maxWidth: 600 }}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="请输入用户名" />
        </Form.Item>

        <Form.Item<FieldType>
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        {/* 内部消化 */}
        <Form.Item
          label="确认密码"
          name="secPassword"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>
      </Form>
    </Modal>
  );
};
//forwardRef(ComName);
// export default ComName;
export default connect(({ login }) => ({
  login,
}))(ComName);
