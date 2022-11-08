import FormList from '@/components/FormList';
import Searchheader from '@/components/Searchheader';
import { PageHeader } from '@/components/SubHeader';
import { useEffect, useState } from 'react';
import styles from './index.less';

// 表格数据
const columns = [
  {
    title: '组态图名称',
    dataIndex: 'name',
  },
  {
    title: '组态图类型',
    dataIndex: 'age',
  },
  {
    title: '所属站点',
    dataIndex: 'address',
  },
  {
    title: '创建人',
    dataIndex: 'address',
  },
  {
    title: '创建时间',
    dataIndex: 'address',
  },
];

const HvacDiagramSet = () => {
  const [loading, setLoading] = useState(false);
  const [tableList, setTableList] = useState([]);

  // 初始化方法
  useEffect(() => {
    getListData();
  }, []);

  // 列表请求
  const getListData = () => {
    let data: any = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
      });
    }
    setTableList(data);
  };

  // 列表点击事件
  const handleClick = (type: string, key: any) => {
    console.log('打印:', type, key);
  };

  // 输出模板
  return (
    <>
      <PageHeader title="暖通组态配置" />
      <div className={styles.moduleContent}>
        <Searchheader time={true} type={4} />

        <FormList
          Scroll={{ y: 'calc(100vh - 350px)' }}
          Columns={columns}
          Data={tableList}
          Loading={loading}
          onCilck={handleClick}
          ShowSelection
          ShowAction={{ show: true, name: ['启用'] }}
          TableBts={[
            { type: 'add', text: '新增' },
            { type: 'update', text: '修改' },
            { type: 'del', text: '删除' },
          ]}
        />
      </div>
    </>
  );
};

export default HvacDiagramSet;
