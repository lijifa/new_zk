import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess, useModel } from '@umijs/max';
import { Button } from 'antd';

const AccessPage: React.FC = () => {
  const access = useAccess();
  const { counter } = useModel('counterModel');
  return (
    <PageContainer
      ghost
      header={{
        title: '权限示例'+counter,
      }}
    >
      <Access accessible={access.canSeeAdmin}>
        <Button>只有 Admin 可以看到这个按钮  ||||||  {counter}</Button>
      </Access>
    </PageContainer>
  );
};

export default AccessPage;
