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
      <PageHeader />
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
      <div className={styles.content}>
        <FormList
          Scroll={{ y: 'calc(100vh - 350px)' }}
          Columns={columns}
          Data={data}
          Loading={loading}
          getItem={handleClick}
          selectionType="check"
          ShowAction={{ show: true, name: ['通过', '驳回'] }}
          ShowPagination
        />
      </div>
    </>
  );
};

export default UserCheck;
