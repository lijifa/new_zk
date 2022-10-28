import Chart from '@/components/Echarts';
import { PageHeader } from '@/components/SubHeader';
import { Button, DatePicker, Select, Space, Table, Tabs } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import type { FilterValue } from 'antd/es/table/interface';
import qs from 'qs';
import { useEffect, useState } from 'react';
import styles from './index.less';

const { Option } = Select;

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
          type="LineChart"
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
            type="LineChart"
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
            type="LineChart"
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
            type="LineChart"
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
            type="LineChart"
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
        <div>
          <Space>
            <Select
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option!.children as unknown as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
            <DatePicker />
            <Button type="primary" size="middle">
              搜索
            </Button>
            <Button size="middle">重置</Button>
          </Space>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.DayBox}>
          <div className={styles.leftBox}>left</div>
          <div className="card-container" style={{ flex: 1 }}>
            <Tabs destroyInactiveTabPane type="card" items={items} />
          </div>
        </div>
        <div style={{ margin: '10px 0' }}>
          <Button type="primary" size="middle">
            导出
          </Button>
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
