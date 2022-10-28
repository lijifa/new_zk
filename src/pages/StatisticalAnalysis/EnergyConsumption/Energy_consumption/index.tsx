import Chart from '@/components/Echarts';
import Searchheader from '@/components/Searchheader';
import { PageHeader } from '@/components/SubHeader';
import { Button, Table, Tabs } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue } from 'antd/es/table/interface';
import qs from 'qs';
import { useEffect, useState } from 'react';
import styles from './index.less';

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

// 页签切换数据;
const TabData = [
  {
    label: '系统温度',
    children: (
      <div style={{ width: '100%', height: '100%' }}>
        <Chart
          type="Line"
          XDATA={[1, 2, 3, 4, 5, 6, 7]}
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
          LineName={['供水温度', '回水温度', '室外温度']}
          LineLegendColor={'#666'}
          LineColor={'#CDD7E8'}
        />
      </div>
    ),
  },
  {
    label: '系统压力',
    children: (
      <>
        <div style={{ width: '100%', height: '100%' }}>
          <Chart
            type="Line"
            XDATA={[1, 2, 3, 4, 5, 6, 7]}
            YDATA={[[1, 2, 3, 4, 5, 6, 8]]}
            LineStyleOpacity={['0', '0', '0']}
            LineStyleColor={['#00D8A0 ']}
            LineXtextColor={'#666'}
            LineYtextColor={'#666'}
            LineTooltipShow
            LineName={['供水温度']}
            LineLegendColor={'#666'}
            LineColor={'#CDD7E8'}
          />
        </div>
      </>
    ),
  },
  {
    label: '系统流量',
    children: (
      <>
        <div style={{ width: '100%', height: '100%' }}>
          <Chart
            type="Line"
            XDATA={[1, 2, 3, 4, 5, 6, 7]}
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
            LineName={['供水温度', '回水温度', '室外温度']}
            LineLegendColor={'#666'}
            LineColor={'#CDD7E8'}
          />
        </div>
      </>
    ),
  },
  {
    label: '耗冷/热量',
    children: (
      <>
        <div style={{ width: '100%', height: '100%' }}>
          <Chart
            type="Line"
            XDATA={[1, 2, 3, 4, 5, 6, 7]}
            YDATA={[
              [1, 2, 3, 4, 5, 6, 8],
              [5, 6, 5, 8, 1, 3, 2],
            ]}
            LineStyleOpacity={['0', '0', '0']}
            LineStyleColor={['#00D8A0 ', '#f7d18a']}
            LineXtextColor={'#666'}
            LineYtextColor={'#666'}
            LineTooltipShow
            LineName={['供水温度', '室外温度']}
            LineLegendColor={'#666'}
            LineColor={'#CDD7E8'}
          />
        </div>
      </>
    ),
  },
  {
    label: '总能耗',
    children: (
      <>
        <div style={{ width: '100%', height: '100%' }}>
          <Chart
            type="Line"
            XDATA={[1, 2, 3, 4, 5, 6, 7]}
            YDATA={[
              [1, 2, 3, 4, 5, 6, 8],
              [8, 1, 6, 3, 8, 5, 6],
            ]}
            LineStyleOpacity={['0', '0', '0']}
            LineStyleColor={['#00D8A0 ', '#268CFF']}
            LineXtextColor={'#666'}
            LineYtextColor={'#666'}
            LineTooltipShow
            LineName={['供水温度', '回水温度']}
            LineLegendColor={'#666'}
            LineColor={'#CDD7E8'}
          />
        </div>
      </>
    ),
  },
];
const items = TabData.map((item: any, i: any) => {
  return {
    label: item.label,
    key: i,
    children: item.children,
  };
});

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

function Energy_consumption() {
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
      <PageHeader title="能源站耗能统计" />
      <div className={styles.selectBox}>
        <Searchheader time={true} smallcheck={true} type={1} />
      </div>
      <div className={styles.content}>
        <div className={styles.DayBox}>
          <div className={styles.leftBox}>
            <div className={styles.energy}>
              <img src={require('@/assets/Energy_consumption/img/hvac1.png')} />
              <div className={styles.energyItem}>
                <div className={styles.energyItemT}>电能耗(kW·h)</div>
                <div className={styles.energyItemN}>
                  <span style={{ color: 'rgba(38, 140, 255)' }}>
                    1111111.11
                  </span>
                </div>
              </div>
              <div className={styles.energyItem}>
                <div className={styles.energyItemT}>费用(元)</div>
                <div className={styles.energyItemN}>
                  <span>1111111.11</span>
                </div>
              </div>
            </div>
            <div className={styles.energy}>
              <img src={require('@/assets/Energy_consumption/img/hvac2.png')} />
              <div className={styles.energyItem}>
                <div className={styles.energyItemT}>水能耗(m³)</div>
                <div className={styles.energyItemN}>
                  <span style={{ color: 'rgba(38, 140, 255)' }}>
                    1111111.11
                  </span>
                </div>
              </div>
              <div className={styles.energyItem}>
                <div className={styles.energyItemT}>费用(元)</div>
                <div className={styles.energyItemN}>
                  <span>1111111.11</span>
                </div>
              </div>
            </div>
            <div className={styles.energy}>
              <img src={require('@/assets/Energy_consumption/img/hvac3.png')} />
              <div className={styles.energyItem}>
                <div className={styles.energyItemT}>天然气(Nm³)</div>
                <div className={styles.energyItemN}>
                  <span style={{ color: 'rgba(38, 140, 255)' }}>111.11</span>
                </div>
              </div>
              <div className={styles.energyItem}>
                <div className={styles.energyItemT}>费用(元)</div>
                <div className={styles.energyItemN}>
                  <span>11.11</span>
                </div>
              </div>
            </div>
          </div>
          <div className="card-container" style={{ flex: 1 }}>
            <Tabs destroyInactiveTabPane type="card" items={items} />
          </div>
        </div>
        <div className={styles.toolBarBox}>
          <Button type="primary" size="middle">
            导出
          </Button>
          <span className={styles.toolbarTip}>
            <img src={require('@/assets/System_operation/img/tipBlue.png')} />
            室外温度、室外湿度、取系统内当日平均值，其他值为当日累计。
          </span>
        </div>
        <div>
          <Table
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
    </>
  );
}

export default Energy_consumption;
