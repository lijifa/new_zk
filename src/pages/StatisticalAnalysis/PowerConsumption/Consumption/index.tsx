//变配站运维分析
import Chart from '@/components/Echarts';
import Searchheader from '@/components/Searchheader';
import { PageHeader } from '@/components/SubHeader';
import { Button, Table, Tabs } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue } from 'antd/es/table/interface';
import qs from 'qs';
import React, { memo, useEffect, useState } from 'react';
import styles from './index.less';
const title = {
  size: 25,
  linHeight: 24,
};
const title2 = {
  text: '总用电量',
  size: 18,
  linHeight: 30,
};
const title4 = {
  text: '总用电费',
  size: 18,
  linHeight: 30,
};
const title3 = {
  text: '(kW·h)',
  size: 16,
};
const title5 = {
  text: '(元)',
  size: 16,
};

let circle = {
  max: 80,
  min: 65,
  top: '30%',
  left: '50%',
};
let middletext = {
  top: '20%',
  left: '48%',
};
let outsidetext = {
  top: '60%',
  left: '32%',
  width1: 40,
};
let outsidetext1 = {
  top: '60%',
  left: '25%',
  width1: 85,
};
let Data = [
  {
    name: '优良',
    value: 0,
  },
  {
    name: '一般',
    value: 0,
  },
  {
    name: '极差',
    value: 0,
  },
  {
    name: '超载',
    value: 0,
  },
];
let Data1 = [
  {
    name: '尖时用电费',
    value: 0,
  },
  {
    name: '峰时用电费',
    value: 0,
  },
  {
    name: '平时用电费',
    value: 0,
  },
  {
    name: '谷时用电费',
    value: 0,
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

//左侧页面数据切换
const LeftLIst = [
  {
    label: '时段电量统计',
    Children: (
      <>
        <div className={styles.earchs}>
          <Chart
            type="ConCom"
            XDATA={Data}
            ConComUnit="KW.h"
            ConComTitle={title}
            ConComTitle2={title2}
            ConComTitle3={title3}
            ConComCircle={circle}
            ConComMiddletext={middletext}
            ConComOutsidetext={outsidetext}
          />
        </div>
      </>
    ),
  },
  {
    label: '时段电费统计',
    Children: (
      <>
        <div className={styles.earchs}>
          <Chart
            type="ConCom"
            XDATA={Data1}
            ConComUnit="KW.h"
            ConComTitle={title}
            ConComTitle2={title4}
            ConComTitle3={title5}
            ConComCircle={circle}
            ConComMiddletext={middletext}
            ConComOutsidetext={outsidetext1}
          />
        </div>
      </>
    ),
  },
];
const items = LeftLIst.map((item: any, index: any) => {
  return {
    label: item.label,
    key: index,
    children: item.Children,
  };
});
//右侧页面数据切换
const RightLIst = [
  {
    label: '电量趋势图',
    Children: (
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
    ),
  },
  {
    label: '电费趋势图',
    Children: (
      <>
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
      </>
    ),
  },
];
const itemT = RightLIst.map((item: any, index: any) => {
  return {
    label: item.label,
    key: index,
    children: item.Children,
  };
});

const Consumption = memo(() => {
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
      <PageHeader title="变配站耗电分析" />
      <div className={styles.moduleContent}>
        <Searchheader time={true} smallcheck={true} type={1} />
        <div className={styles.module}>
          <div className={styles.moduleLeft}>
            <Tabs type="card" items={items} destroyInactiveTabPane />
          </div>
          <div className={styles.moduleRight}>
            <Tabs type="card" items={itemT} destroyInactiveTabPane />
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
              <span className={styles.toolbarTip}>
                运行建议：尖时间段和峰时间段用电量尽量不要超过总用电量的40%
              </span>
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

export default Consumption;
