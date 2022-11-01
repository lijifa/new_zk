import ExportList from '@/components/FormList';
import Searchheader from '@/components/Searchheader';
import { PageHeader } from '@/components/SubHeader';
import type { TablePaginationConfig } from 'antd/es/table';
import qs from 'qs';
import { useEffect, useState } from 'react';
import styles from './index.less';

// 表格数据
const columns = [
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

function Efficiency_analysis() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<any>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // 数据请求
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
            total: 100,
          },
        });
      });
  };
  const getRandomuserParams = (params: any) => ({
    results: params.pagination?.pageSize,
    page: params.pagination?.current,
    ...params,
  });

  const handleClick = (Listkey: any) => {
    console.log('点击:', Listkey);
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
      <PageHeader title="能效分析" />
      <div className={styles.selectBox}>
        <Searchheader time={true} type={3} />
      </div>
      <div className={styles.content}>
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
    </>
  );
}

export default Efficiency_analysis;
