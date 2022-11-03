//告警规则配置
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
let list = [
  {
    label: '静海区政府西楼变电室',
  },
  {
    label: '静海区政府西楼变电室',
  },
  {
    label: '静海区政府西楼变电室',
  },
];
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
    title: '时间',
    dataIndex: 'name',
    render: (name) => `${name.first} ${name.last}`,
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

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});


const AlarmRulesSet = memo(() => {
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
      <PageHeader title="告警规则配置" />
      <div className={styles.moduleContent}>
        <Searchheader time={true} type={1} list={list}  serarch={true}/>
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

export default AlarmRulesSet;
