import FormList from '@/components/FormList';
import Searchheader from '@/components/Searchheader';
import { PageHeader } from '@/components/SubHeader';
import { DownOutlined, RedoOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import { useState } from 'react';
import styles from './index.less';

const { DirectoryTree } = Tree;

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
        title: 'leaf',
        key: '1',
        isLeaf: true,
      },
      {
        title: 'leaf',
        key: '2',
        isLeaf: true,
      },
      {
        title: 'leaf',
        key: '3',
        isLeaf: true,
      },
    ],
  },
];

const UserManage = () => {
  const [loading, setLoading] = useState(false);
  const [treeIcon, setTreeIcon] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['0-0']);

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

  // 监听表格点击
  const handleClick = (type: string, key: any) => {
    console.log('打印:', type, key);
  };

  // 展开/收起节点时触发
  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand:', expandedKeysValue);
    setExpandedKeys(expandedKeysValue);
  };

  // 点击刷新
  const Refrish = () => {
    console.log('点击刷新');
  };

  // 点击展开/收回
  const ToggleTree = () => {
    setTreeIcon(!treeIcon);
    setExpandedKeys(treeIcon ? ['0-0'] : []);
  };

  return (
    <>
      <PageHeader title="用户管理" />
      <div className={styles.content}>
        <div className={styles.TreeBox}>
          <div className={styles.Treetitle}>
            <span>部门信息</span>
            <div>
              <Button
                type="link"
                icon={treeIcon ? <UpOutlined /> : <DownOutlined />}
                onClick={() => ToggleTree()}
              />
              <Button
                type="link"
                icon={<RedoOutlined />}
                onClick={() => Refrish()}
              />
            </div>
          </div>
          <DirectoryTree
            multiple
            className={styles.tree}
            onSelect={onSelect}
            treeData={treeData}
            onExpand={onExpand}
            expandedKeys={expandedKeys}
          />
        </div>
        <div style={{ flex: 1, width: 200 }}>
          <div className={styles.selectBox}>
            <Searchheader time={true} type={4} />
          </div>
          <div className={styles.container}>
            <FormList
              Scroll={{ y: 'calc(100vh - 300px)' }}
              Columns={columns}
              Data={data}
              Loading={loading}
              onCilck={handleClick}
              ShowAction={{ show: true, name: ['查看', '删除'] }}
              ShowSelection
              ShowPagination
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManage;
