import FormList from '@/components/FormList';
import Searchheader from '@/components/Searchheader';
import { PageHeader } from '@/components/SubHeader';
import { useState } from 'react';
import styles from './index.less';

// 表格数据
const columns = [
  {
    title: '角色名称',
    dataIndex: 'name',
  },
  {
    title: '所属企业',
    dataIndex: 'age',
  },
  {
    title: '权限字符',
    dataIndex: 'address',
  },
  {
    title: '显示顺序',
    dataIndex: 'address',
  },
  {
    title: '状态',
    dataIndex: 'address',
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
      <PageHeader title="角色管理" />
      <div className={styles.selectBox}>
        <Searchheader time={true} type={4} />
      </div>
      <div className={styles.content}>
        <FormList
          Scroll={{ y: 'calc(100vh - 350px)' }}
          Columns={columns}
          Data={data}
          Loading={loading}
          onCilck={handleClick}
          ShowSelection
          ShowAction={{ show: true, name: ['启用'] }}
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
