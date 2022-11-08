//操作日志
import Searchheader from '@/components/Searchheader';
import { PageHeader } from '@/components/SubHeader';
import { getLogList } from '@/services/Logs';
import ExportList from '@/components/FormList';
import React, { memo, useEffect,useState } from 'react';
import styles from './index.less';
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
const placeholder = ['请选择所属项目', '请选择所属系统', '请选择所属站点'];
let List = [list1, list2, list3];
let Inputdefalut = ['请输入缴费单位搜索'];
let setlectdefalut = [undefined, undefined, undefined];
let inputvaluedefalut = ['', ''];
// 表格数据
const columns = [
  {
    title: '时间',
    dataIndex: 'name',
  },
  {
    title: '所属站点',
    dataIndex: 'gender',
  },
  {
    title: '室外温度(℃)',
    dataIndex: 'gender',
  },
  {
    title: '室外湿度(%)',
    dataIndex: 'gender',
  },

  {
    title: '电能耗(kW·h)',
    dataIndex: 'gender',
  },
  {
    title: '电费(元)',
    dataIndex: 'gender',
  },
  {
    title: '水能耗(m³)',
    dataIndex: 'gender',
  },
  {
    title: '水费(元)',
    dataIndex: 'gender',
  },
  {
    title: '天然气能耗(Nm³)',
    dataIndex: 'gender',
  },
  {
    title: '天然气费(元)',
    dataIndex: 'gender',
  },
];

const Logs = memo(() => {
  useEffect(() => {
    getLogList().then((res) => {
      console.log(res);
    });
  });
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

  const handleTableChange = (value: any, key: any) => {
    console.log(value, key);
  };
  const handleClick = (Listkey: any) => {
    console.log('点击:', Listkey);
  };
  return (
    <>
      <PageHeader title="操作日志" />
      <div className={styles.moduleContent}>
        <Searchheader
          List={List}
          placeholder={placeholder}
          type="defalut"
          Inputdefalut={Inputdefalut}
          setlectdefalut={setlectdefalut}
          inputvaluedefalut={inputvaluedefalut}
        />
        <div className={styles.table}>
        <ExportList
              Loading={loading}
              onChange={handleTableChange}
              Data={data}
              Columns={columns}
              Scroll={{ y: 'calc(100vh - 400px)' }}
              onCilck={handleClick}
              TableBts={[
                { type: 'add', text: '新增' },
                { type: 'update', text: '修改' },
                { type: 'del', text: '删除' },
              ]}
            />
        </div>
      </div>
    </>
  );
});

export default Logs;
