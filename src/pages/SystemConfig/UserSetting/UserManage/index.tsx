import FormList from '@/components/FormList';
import Searchheader from '@/components/Searchheader';
import { PageHeader } from '@/components/SubHeader';
import { DownOutlined } from '@ant-design/icons';
import { Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
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
    title: '角色',
    dataIndex: '',
  },
  {
    title: '所属部门',
    dataIndex: '',
  },
  {
    title: '所属岗位',
    dataIndex: '',
  },
  {
    title: '在职/离职',
    dataIndex: '',
  },
  {
    title: '入职日期',
    dataIndex: '',
  },
  {
    title: '离职日期',
    dataIndex: '',
  },
];
const treeData: DataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
          {
            title: 'leaf',
            key: '0-0-0-2',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [
          {
            title: 'leaf',
            key: '0-0-1-0',
          },
        ],
      },
      {
        title: 'parent 1-2',
        key: '0-0-2',
        children: [
          {
            title: 'leaf',
            key: '0-0-2-0',
          },
          {
            title: 'leaf',
            key: '0-0-2-1',
          },
        ],
      },
    ],
  },
];

const UserManage = () => {
  const [loading, setLoading] = useState(false);

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

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
      <PageHeader title="用户管理" />
      <div className={styles.content}>
        <div>
          <Tree
            className={styles.tree}
            showLine
            switcherIcon={<DownOutlined />}
            defaultExpandedKeys={['0-0-0']}
            onSelect={onSelect}
            treeData={treeData}
          />
        </div>
        <div>
          <div className={styles.selectBox}>
            <Searchheader time={true} type={4} />
          </div>
          <div className={styles.container}>
            <FormList
              Scroll={{ y: 'calc(100vh - 350px)' }}
              Columns={columns}
              Data={data}
              Loading={loading}
              onCilck={handleClick}
              showAction={{ show: true, name: ['查看', '删除'] }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManage;
