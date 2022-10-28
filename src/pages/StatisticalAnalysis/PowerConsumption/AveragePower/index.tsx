//耗电环比分析
import Analyseheader from '@/components/Analyseheader';
import Chart from '@/components/Echarts';
import Searchheader from '@/components/Searchheader';
import { PageHeader } from '@/components/SubHeader';
import { Button, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue } from 'antd/es/table/interface';
import qs from 'qs';
import React, { memo, useEffect, useState } from 'react';
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
let data1 = [
  {
    text: '平均功率因数',
    color: 'rgba(38, 140, 255, 1)',
  },
  {
    text: '标准值',
    color: 'rgba(255, 161, 161, 1)',
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
    title: '室外温度(℃)',
    dataIndex: 'gender',
  },
  {
    title: '室外湿度(%)',
    dataIndex: 'gender',
  },
  {
    title: '供水温度(℃)',
    dataIndex: 'gender',
  },
  {
    title: '回水温度(℃)',
    dataIndex: 'gender',
  },
  {
    title: '供水压力(bar)',
    dataIndex: 'gender',
  },
  {
    title: '回水压力(bar)',
    dataIndex: 'gender',
  },
  {
    title: '系统温差(℃)',
    dataIndex: 'gender',
  },
  {
    title: '系统压差(bar)',
    dataIndex: 'gender',
  },
  {
    title: '系统流量(m³)',
    dataIndex: 'gender',
  },
  {
    title: '耗冷(热)量(GJ)',
    dataIndex: 'gender',
  },
  {
    title: '总能耗(kgce)',
    dataIndex: 'gender',
  },
];

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

const AveragePower = memo(() => {
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
      <PageHeader title="平均功率因数" />
      <div className={styles.moduleContent}>
        <Searchheader time={true} type={1} list={list} />
        <div className={styles.module}>
          <Analyseheader
            title="平均功率因数趋势图"
            type="rectangle"
            data={data1}
          />
          <div className={styles.earchs}>
            <Chart
              type="Line"
              XDATA={[
                '2022-09-26',
                '2022-09-29',
                '2022-10-01',
                '2022-10-05',
                '2022-10-09',
                '2022-10-14',
                '2022-10-18',
              ]}
              YDATA={[
                [1, 2, 3, 4, 5, 6, 8],
                [8, 1, 6, 3, 8, 5, 6],
                [5, 6, 5, 8, 1, 3, 2],
              ]}
              LineStyleOpacity={['0', '0', '0']}
              LineStyleColor={['#00D8A0 ', '#268CFF', '#f7d18a']}
              LineXtextColor={'#666'}
              LineYtextColor={'#666'}
              LineTooltipShow
              LineLegendColor={'#666'}
              LineColor={'#CDD7E8'}
            />
          </div>
        </div>
        <div className={styles.moduleB}>
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
              <div className={styles.barsRight}>
                  <i className={styles.green}></i>
                  <span>功率因数高于标准值</span>
                  <i className={styles.red}></i>
                  <span>功率因数低于标准值</span>
              </div>
            </div>
          
          </div>
          <div className={styles.Table}>
            <Table
              style={{ marginTop: 20 }}
              scroll={{ y: 'calc(100vh - 750px)' }}
              columns={columns}
              rowKey={(record) => record.login.uuid}
              dataSource={data}
              pagination={tableParams.pagination}
              loading={loading}
              onChange={handleTableChange}
            />
          </div>
        </div>
      </div>
    </>
  );
});

export default AveragePower;
