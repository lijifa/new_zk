import Searchheader from '@/components/Searchheader';
import { PageHeader } from '@/components/SubHeader';
import { Button, Table } from 'antd';
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

function User_comfort() {
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
      <PageHeader title="用户舒适度分析" />
      <div className={styles.selectBox}>
        <Searchheader time={true} type={4} />
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

export default User_comfort;
