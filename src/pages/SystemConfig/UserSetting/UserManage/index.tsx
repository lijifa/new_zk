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

// select假数据
const placeholder = ['请选择所属项目', '请选择所属系统', '请选择所属站点'];
let list1 = [
  { id: 1, text: '光合谷A能源站' },
  { id: 3, text: '国际企业社区机房_0' },
];
let list2 = [
  { id: 2, text: '暖通系统' },
  { id: 7, text: '空调末端' },
];
let list3 = [
  { id: 6, text: '轨道集团光合谷园系统' },
  { id: 34, text: '静海政府智慧能源管理' },
];
let List = [list1, list2, list3];
let Inputdefalut = ['请输入缴费单位搜索'];
let setlectdefalut = [undefined, undefined, undefined];
let inputvaluedefalut = ['', ''];

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
      <PageHeader />
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
            <Searchheader
              List={List}
              placeholder={placeholder}
              type="defalut"
              Inputdefalut={Inputdefalut}
              setlectdefalut={setlectdefalut}
              inputvaluedefalut={inputvaluedefalut}
            />
          </div>
          <div className={styles.container}>
            <FormList
              Scroll={{ y: 'calc(100vh - 300px)' }}
              Columns={columns}
              Data={data}
              Loading={loading}
              getItem={handleClick}
              selectionType="check"
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
