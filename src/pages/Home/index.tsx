import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import React from 'react';
import { FormattedMessage } from 'umi';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <FormattedMessage id="welcome" />
        {name}
      </div>
    </PageContainer>
  );
};

export default HomePage;
