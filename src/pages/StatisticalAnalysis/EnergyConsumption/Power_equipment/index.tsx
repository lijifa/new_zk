import ExportList from '@/components/FormList';
import Searchheader from '@/components/Searchheader';
import { PageHeader } from '@/components/SubHeader';
import type { TablePaginationConfig } from 'antd/es/table';
import type { FilterValue } from 'antd/es/table/interface';
import qs from 'qs';
import { useEffect, useState } from 'react';
import styles from './index.less';

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Record<string, FilterValue>;
}

// 表格数据
const columns = [
  {
    title: '设备名称',
    dataIndex: 'name',
    render: (name: any) => `${name.first} ${name.last}`,
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
        <Searchheader time={true} type={4} />
      </div>
      <div className={styles.content}>
        <div style={{ margin: '10px 0' }}>
          <div className={styles.allpower}>耗电总量：0.00（kW·h）</div>
        </div>
        <ExportList
          Scroll={{ y: 'calc(100vh - 350px)' }}
          Columns={columns}
          Data={data}
          Pagination={tableParams.pagination}
          Loading={loading}
          onChange={handleTableChange}
        />
      </div>
    </>
  );
}

export default Power_equipment;
