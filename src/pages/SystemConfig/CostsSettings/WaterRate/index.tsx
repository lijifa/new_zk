//水费单价维护
import Searchheader from '@/components/Searchheader';
import { PageHeader } from '@/components/SubHeader';
import { Button,Table} from 'antd';
import React, { memo } from 'react';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import ExportList from '@/components/FormList';
import type { FilterValue } from 'antd/es/table/interface';
import qs from 'qs';
import { useEffect, useState } from 'react';
import styles from './index.less';
let list1 =[
  {id:1,text:'光合谷A能源站'},
  {id:3,text:'国际企业社区机房_0'}

]
let list2 = [
  {id:2,text:'暖通系统'},
  {id:7,text:'空调末端'}
]
let list3 = [
  {id:6,text:'轨道集团光合谷园系统'},
  {id:34,text:'静海政府智慧能源管理'}
]
const placeholder = ['请选择所属项目','请选择所属系统','请选择所属站点']
let List = [list1,list2,list3]
console.log(List)


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




const HeatRate = memo(() => {

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





  const handleTableChange = (value:any,key:any) => {
    console.log(value,key)

  };
  const handleClick = (Listkey: any) => {
    console.log('点击:', Listkey);
  };

  return (
    <>
      <PageHeader title="水费单价维护" />
      <div className={styles.moduleContent}>
        <Searchheader time={false} type={1} list={List}  serarch={true} placeholder={placeholder}/>
        <div className={styles.module}>
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
      </div>
    </>
  );
});

export default HeatRate;
