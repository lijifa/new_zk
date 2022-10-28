import { PageHeader } from '@/components/SubHeader';
import { Button, DatePicker, Select, Space, Table } from 'antd';
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

// 表格数据
const columns: ColumnsType<DataType> = [
  {
    title: '站点名称',
    dataIndex: 'gender',
  },
  {
    title: '所属项目',
    dataIndex: 'gender',
  },
  {
    title: '室外环境温度(℃)',
    dataIndex: 'gender',
  },
  {
    title: '室外环境湿度(%)',
    dataIndex: 'gender',
  },
  {
    title: '耗电量(kW·h))',
    dataIndex: 'gender',
  },
  {
    title: '用电费用(元))',
    dataIndex: 'gender',
  },
  {
    title: '耗水量(m³)',
    dataIndex: 'gender',
  },
  {
    title: '用水费用(元)',
    dataIndex: 'gender',
  },
  {
    title: '耗气量(Nm³)',
    dataIndex: 'gender',
  },
  {
    title: '用气费用(元)',
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

function System_operation_analysis() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
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

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    // console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <>
      <PageHeader title="能效分析" />
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
        <div style={{ margin: '10px 0' }}>
          <Button
            type="primary"
            onClick={start}
            disabled={!hasSelected}
            size="middle"
          >
            导出
          </Button>
        </div>
        <div>
          <Table
            rowSelection={rowSelection}
            scroll={{ y: 'calc(100vh - 350px)' }}
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

export default System_operation_analysis;
