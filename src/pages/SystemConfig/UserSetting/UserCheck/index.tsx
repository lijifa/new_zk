import FormList from '@/components/FormList';
import Searchheader from '@/components/Searchheader';
import { PageHeader } from '@/components/SubHeader';
import { useState } from 'react';
import styles from './index.less';

// 表格数据
const columns = [
  {
    title: '用户名',
    dataIndex: 'name',
  },
  {
    title: '真实姓名',
    dataIndex: 'age',
  },
  {
    title: '手机号',
    dataIndex: 'address',
  },
  {
    title: '申请次数',
    dataIndex: '',
  },
  {
    title: '申请时间',
    dataIndex: '',
  },
  {
    title: '申请理由',
    dataIndex: '',
  },
  {
    title: '审核人',
    dataIndex: '',
  },
  {
    title: '审核时间',
    dataIndex: '',
  },
  {
    title: '审核状态',
    dataIndex: '',
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
      <PageHeader title="用户审核" />
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
          ShowAction={{ show: true, name: ['通过', '驳回'] }}
          ShowPagination
        />
      </div>
    </>
  );
};

export default UserCheck;
