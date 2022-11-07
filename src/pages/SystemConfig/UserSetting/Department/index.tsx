import FormList from '@/components/FormList';
import Searchheader from '@/components/Searchheader';
import { PageHeader } from '@/components/SubHeader';
import { useState } from 'react';
import styles from './index.less';

// 表格数据
const columns = [
  {
    title: '部门名称',
    dataIndex: 'name',
  },
  {
    title: '显示顺序',
    dataIndex: 'age',
  },
  {
    title: '联系人姓名',
    dataIndex: 'address',
  },
  {
    title: '联系人电话',
    dataIndex: 'address',
  },
  {
    title: '创建时间',
    dataIndex: 'address',
  },
];

const UserCheck = () => {
  const [loading, setLoading] = useState(false);

  const data: any = [
    {
      key: 1,
      name: `Edward King `,
      age: 32,
      address: `London, Park Lane no.`,
      children: [
        {
          key: 11,
          name: 'John Brown',
          age: 42,
          address: 'New York No. 2 Lake Park',
        },
        {
          key: 12,
          name: 'John Brown jr.',
          age: 30,
          address: 'New York No. 3 Lake Park',
        },
      ],
    },
  ];

  const handleClick = (type: string, key: any) => {
    console.log('打印:', type, key);
  };

  return (
    <>
      <PageHeader title="部门维护" />
      <div className={styles.selectBox}>
        <Searchheader time={true} type={4} />
      </div>
      <div className={styles.warnText}>注：请按照同一层级进行从小到大排序</div>
      <div className={styles.content}>
        <FormList
          Scroll={{ y: 'calc(100vh - 350px)' }}
          Columns={columns}
          Data={data}
          Loading={loading}
          onCilck={handleClick}
          ShowAction={{ show: true, name: ['编辑', '新增', '删除'] }}
          TableBts={[
            { type: 'add', text: '新增' },
            { type: 'collapse', text: '展开/折叠' },
          ]}
        />
      </div>
    </>
  );
};

export default UserCheck;
