/*
 * @Author: yeyuxiu
 * @Date: 2025-05-02 10:31:56
 * @LastEditors: yeyuxiu
 * @LastEditTime: 2025-05-02 17:16:16
 * @Description: 404页面
 */
import React, { useEffect } from 'react';
//import classnames from 'classnames';
//import moment from 'moment';
const NotFoundPage: React.FC = (props, ref) => {
  //useImperativeHandle(ref, () => ({
  //lyFormRef
  //}));
  //const {} = props
  useEffect(() => {}, []);
  return (
    <div className="h-screen flex justify-center items-center">
      <h1>404 Not Found</h1>
      <p>抱歉，您访问的页面不存在。</p>
    </div>
  );
};
//forwardRef(ComName);
export default NotFoundPage;
//export default connect(({ test }) => ({
//...test
//}))(ComName);
