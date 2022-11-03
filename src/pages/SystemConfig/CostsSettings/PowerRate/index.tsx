//电费单价维护
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
console.log(List)
interface DataType {
  name: {
    first: string;
    last: string;
  };
  gender: string;
  login: {
    uuid: string;
  };
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

// 表格数据
const columns: ColumnsType<DataType> = [
  {
    title: '缴费单位',
    dataIndex: 'name',
    render: (name) => `${name.first} ${name.last}`,
  },
  {
    title: '用电类型',
    dataIndex: 'gender',
  },
  {
    title: '所属项目',
    dataIndex: 'gender',
  },
  {
    title: '所属系统',
    dataIndex: 'gender',
  },

  {
    title: '所属站点',
    dataIndex: 'gender',
  },
  {
    title: '站点所在地',
    dataIndex: 'gender',
  },
  {
    title: '创建时间',
    dataIndex: 'gender',
  },
  {
    title: '操作',
    dataIndex: 'gender',
  },
];

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});


const PowerRate = memo(() => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = () => {
    setLoading(true);
    fetch(
      `https://randomuser.me/api?${qs.stringify(
        getRandomuserParams(tableParams),
      )}`,
    )
      .then((res) => res.json())
      .then(({ results }) => {
        setData(results);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 200,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      });
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams({
      pagination,
    });
  };
  const handleClick = (Listkey: any) => {
    console.log('点击:', Listkey);
  };

  return (
    <>
      <PageHeader title="电费单价维护" />
      <div className={styles.moduleContent}>
        <Searchheader time={false} type={1} list={List}  serarch={true}/>
        <div className={styles.module}>
          <div className={styles.bars}>
            <Button
              type="primary"
              style={{
                textAlign: 'center',
                alignItems: 'center',
              }}
            >
              新增
            </Button>
            <Button
              style={{
                color: ' #268CFF',
                marginLeft: '5px',
              }}
            >
              修改
            </Button>
            <Button
              style={{
                color: ' #268CFF',
                marginLeft: '5px',
              }}
            >
              删除
            </Button>
          </div>
          <div className={styles.table}>
          <ExportList
          Loading={loading}
          onChange={handleTableChange}
          Data={data}
          Columns={columns}
          Pagination={tableParams.pagination}
          Scroll={{ y: 'calc(100vh - 350px)' }}
          onCilck={handleClick}
        />
        </div>

        </div>
      </div>
    </>
  );
});

export default PowerRate;
