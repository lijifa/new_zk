//操作日志
import Searchheader from '@/components/Searchheader';
import { PageHeader } from '@/components/SubHeader';
import React, { memo, useEffect } from 'react';
import {getLogList} from '@/services/Logs'
import styles from './index.less';
let list1 =[
  {id:1,text:'光合谷A能源站'},
  {id:2,text:'国际企业社区机房_0'}
]
let list2 = [
  {id:1,text:'暖通系统'},
  {id:2,text:'空调末端'}
]
let list3 = [
  {id:6,text:'轨道集团光合谷园系统'},
  {id:34,text:'静海政府智慧能源管理'}
]
let List = [list1,list2,list3]

const Logs = memo(() => {
  useEffect(()=>{
    getLogList().then(res=>{
      console.log(res)
    })
  })
  return (
    <>
      <PageHeader title="操作日志" />
      <div className={styles.moduleContent}>
        <Searchheader time={true} type={1} list={List} serarch={true} />
        <div className={styles.table}></div>
      </div>
    </>
  );
});

export default Logs;
