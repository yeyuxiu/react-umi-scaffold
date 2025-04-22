import { postReq } from '@/utils/request';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd'; //get
import { Button, message, Upload } from 'antd';
import React from 'react';

// const getJson = (): Promise<any> => {
//   return getReq('/api/someJSON');
// };

interface student {
  username: string;
  age: number;
}
// post
const postJson = (obj: student): Promise<any> => {
  return postReq('/api/postJSON', obj);
};

const uploadPorps: UploadProps = {
  name: 'file',
  action: '/api/upload',
  // headers: {
  //   authorization: 'authorization-text',
  // },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const HomePage: React.FC = () => {
  return (
    <div>
      <Button onClick={() => {}}>get请求</Button>
      <Button
        onClick={() => {
          postJson({
            username: 'smilechao',
            age: 18,
          }).then((res) => {
            console.log(res, 'post请求');
          });
        }}
      >
        post请求
      </Button>

      <Upload {...uploadPorps}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>

      <div>
        <div className="text-gray-900 h6 w6 bg-sky-400">1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </div>
    </div>
  );
};

export default HomePage;
