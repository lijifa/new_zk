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
    title: '设备名称',
    dataIndex: 'name',
    render: (name) => `${name.first} ${name.last}`,
  },
  {
    title: '所属设备类型',
    dataIndex: 'gender',
  },
  {
    title: '所属项目',
    dataIndex: 'gender',
  },
  {
    title: '所属站点',
    dataIndex: 'gender',
  },
  {
    title: '耗电量',
    dataIndex: 'gender',
  },
];

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

function Power_equipment() {
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
      <PageHeader title="设备耗电分析" />
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
          <div className={styles.allpower}>耗电总量：0.00（kW·h）</div>
        </div>
        <div>
          <Table
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

export default Power_equipment;
