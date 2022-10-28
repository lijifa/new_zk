import Searchheader from '@/components/Searchheader';
import { PageHeader } from '@/components/SubHeader';
import {Button,Table} from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue } from 'antd/es/table/interface';
import qs from 'qs';
import { useEffect, useState } from 'react';
import React, { memo } from 'react';
import styles from './index.less'
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
      title: '用户侧支路名称',
      dataIndex: 'name',
      render: (name) => `${name.first} ${name.last}`,
    },
    {
      title: '站点名称',
      dataIndex: 'gender',
    },
    {
      title: '所属项目',
      dataIndex: 'gender',
    },
    {
      title: '站内供水温度(℃)',
      dataIndex: 'gender',
    },
    {
      title: '站内回水温度(℃)',
      dataIndex: 'gender',
    },
    {
      title: '末端供水温度(℃)',
      dataIndex: 'gender',
    },
    {
      title: '末端回水温度(℃))',
      dataIndex: 'gender',
    },
    {
      title: '站内平均流量(t/h)',
      dataIndex: 'gender',
    },
    {
      title: '末端平均流量(t/h)',
      dataIndex: 'gender',
    },
    {
      title: '站内冷(热)量(kW·h)',
      dataIndex: 'gender',
    },
    {
      title: '末端总管冷(热)量(kW·h)',
      dataIndex: 'gender',
    },
    {
      title: '末端室内温度(℃)',
      dataIndex: 'gender',
    },
    {
      title: '日期',
      dataIndex: 'cell',
    },
  ];
  
  const getRandomuserParams = (params: TableParams) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });
  


const EleDeviceEnergyAndCostList = memo(() => {
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
  return (
    <>
      <PageHeader title="分项耗电分析" />
      <div className={styles.moduleContent}>
      <Searchheader time={true} type={2} list={list} /> 
      <div className={styles.bars}>
            <div className={styles.barscontent}>
              <Button
                type="primary"
                style={{
                  textAlign: 'center',
                  alignItems: 'center',
                  height: '30px',
                }}
              >
                导出
              </Button>
            </div>
          
          </div>
        <div className={styles.table}>
        <Table
              style={{ marginTop: 20 }}
              scroll={{ y: 'calc(100vh - 400px)' }}
              columns={columns}
              rowKey={(record) => record.login.uuid}
              dataSource={data}
              pagination={tableParams.pagination}
              loading={loading}
              onChange={handleTableChange}
            />
        </div>

      </div>
    </>
  );
});

export default EleDeviceEnergyAndCostList;
