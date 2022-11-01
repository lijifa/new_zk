import { Button, Table } from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import { useState } from 'react';
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
interface ExportList {
  Columns: ColumnsType<DataType>;
  Data: DataType[] | undefined;
  Pagination: TablePaginationConfig | undefined;
  onChange: any;
  Loading: boolean;
  onCilck: any;
  Scroll?: {
    x?: string | number;
    y?: string | number;
  };
}
interface FormList {
  Columns: ColumnsType<DataType>;
  Data: DataType[] | undefined;
  Pagination: TablePaginationConfig | undefined;
  onChange: any;
  Loading: boolean;
  Scroll?: {
    x?: string | number;
    y?: string | number;
  };
}

const ExportList = ({
  Columns,
  Scroll,
  Data,
  Pagination,
  onChange,
  Loading,
  onCilck,
}: ExportList) => {
  const [loading, setLoading] = useState(Loading);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  // 表格header
  const columns: ColumnsType<DataType> = Columns;

  // 监听选择到的列表
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // Row选项配置
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // 导出点击事件
  const exportList = () => {
    setLoading(true);
    setTimeout(() => {
      onCilck(selectedRowKeys);
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  // 判断选择数量
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div className={styles.content}>
      <div style={{ margin: '10px 0' }}>
        <Button
          type="primary"
          onClick={exportList}
          disabled={!hasSelected}
          size="middle"
        >
          导出
        </Button>
      </div>
      <Table
        // 左侧点击选择框
        rowSelection={rowSelection}
        // scroll 滚动高度
        scroll={Scroll}
        // columns 顶部header数据
        columns={columns}
        // rowKey 拿到所有的数据的key
        rowKey={(record) => record.login.uuid}
        dataSource={Data}
        pagination={Pagination}
        loading={loading || Loading}
        onChange={onChange}
      />
    </div>
  );
};

export default ExportList;

export const FormList = ({
  Columns,
  Data,
  Pagination,
  Loading,
  onChange,
  Scroll,
}: FormList) => {
  return (
    <div>
      <Table
        scroll={Scroll}
        columns={Columns}
        rowKey={(record) => record.login.uuid}
        dataSource={Data}
        pagination={Pagination}
        loading={Loading}
        onChange={onChange}
      />
    </div>
  );
};
