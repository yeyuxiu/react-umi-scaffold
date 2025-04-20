/*
 * @Description:
 * @Author: smilechao
 * @Date: 2023-06-14 09:27:50
 * @dev:
 */
import { Button } from 'antd';
import React, { useEffect } from 'react';
//import classnames from 'classnames';
import { history } from 'umi';
import styles from './index.less';
//import moment from 'moment';
const ComName: React.FC = () => {
  //useImperativeHandle(ref, () => ({
  //lyFormRef
  //}));
  //const {} = props

  useEffect(() => {}, []);
  return (
    <div className={styles.box}>
      <Button
        onClick={() => {
          history.push('/home');
        }}
      >
        跳转
      </Button>
    </div>
  );
};
//forwardRef(ComName);
export default ComName;
//export default connect(({ test }) => ({
//...test
//}))(ComName);
