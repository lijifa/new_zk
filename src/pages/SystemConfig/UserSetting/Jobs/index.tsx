import FormList from '@/components/FormList';
import Searchheader from '@/components/Searchheader';
import { PageHeader } from '@/components/SubHeader';
import { useState } from 'react';
import styles from './index.less';

// 表格数据
const columns = [
  {
    title: '岗位名称',
    dataIndex: 'name',
  },
  {
    title: '创建人',
    dataIndex: 'age',
  },
  {
    title: '创建时间',
    dataIndex: 'address',
  },
];

const UserCheck = () => {
  const [loading, setLoading] = useState(false);

  const data: any = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }

  const handleClick = (type: string, key: any) => {
    console.log('打印:', type, key);
  };

  return (
    <>
      <PageHeader title="岗位维护" />
      <div className={styles.selectBox}>
        <Searchheader time={false} type={1} />
      </div>
      <div className={styles.content}>
        <FormList
          Scroll={{ y: 'calc(100vh - 350px)' }}
          Columns={columns}
          Data={data}
          ShowSelection
          Loading={loading}
          onCilck={handleClick}
          TableBts={[
            { type: 'add', text: '新增' },
            { type: 'update', text: '修改' },
            { type: 'del', text: '删除' },
          ]}
        />
      </div>
    </>
  );
};

export default UserCheck;