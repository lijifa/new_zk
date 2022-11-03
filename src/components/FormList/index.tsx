import { Button, ConfigProvider, Pagination, Space, Table } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import styles from './index.less';

// 表格中操作列 show 是否显示   name 操作名字
/* showAction={{ show: true, name: ['查看', '删除'] }} */

// 表格顶部按钮
/* TableBts={[
  { type: 'add', text: '添加' },
  { type: 'update', text: '修改' },
  { type: 'del', text: '删除' },
]} */

interface DataType {
  name: {
    first: string;
    last: string;
  };
  gender: string;
  login: {
    uuid: string;
  };
  key: number;
}

interface FormList {
  Columns: ColumnsType<DataType>;
  Data: DataType[] | undefined;
  Loading: boolean;
  onCilck: any;
  TableBts?: {
    type: string;
    text: string;
  }[];
  showAction?: {
    show: boolean;
    name: string[];
  };
  Scroll?: {
    x?: string | number;
    y?: string | number;
  };
}

const FormList = ({
  Columns,
  Scroll,
  Data,
  Loading,
  onCilck,
  showAction,
  TableBts,
}: FormList) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [columns, setColumns] = useState(Columns);
  const [tableBts, setTableBts] = useState([]);
  const [display, setDisplay] = useState(true);

  useEffect(() => {
    const tableTitle = Columns;
    if (showAction?.show) {
      tableTitle.push({
        title: '操作',
        key: 'action',
        render: (_, record, key) => (
          <Space>
            {showAction.name?.map((res, index) => {
              return (
                <a key={index} onClick={(e: any) => ActionClick(e, key)}>
                  {res}
                </a>
              );
            })}
          </Space>
        ),
      });
    }
    setColumns(tableTitle);
    return () => {
      if (showAction?.show) {
        tableTitle.pop();
      }
    };
  }, [selectedRowKeys]);

  useEffect(() => {
    let TableBtns: any = [];
    TableBts?.map((res, index) => {
      switch (res.type) {
        case 'add':
          TableBtns.push(
            <Button
              key={index}
              type="primary"
              onClick={() => TableToolClick('add')}
              size="middle"
            >
              {res.text}
            </Button>,
          );
          break;
        case 'del':
          TableBtns.push(
            <Button
              key={index}
              type="primary"
              onClick={() => TableToolClick('del')}
              disabled={!hasSelected}
              size="middle"
              danger
            >
              {res.text}
            </Button>,
          );
          break;
        case 'update':
          TableBtns.push(
            <Button
              key={index}
              type="primary"
              onClick={() => TableToolClick('update')}
              disabled={!hasSelected}
              size="middle"
              className={styles.updateBtn}
            >
              {res.text}
            </Button>,
          );
          break;
        case 'export':
          TableBtns.push(
            <Button
              key={index}
              type="primary"
              onClick={() => TableToolClick('export')}
              disabled={!hasSelected}
              size="middle"
            >
              {res.text}
            </Button>,
          );
          break;
        default:
          break;
      }
    });
    setTableBts(TableBtns);
    setDisplay(false);
  }, [selectedRowKeys]);

  // 监听选择到的列表
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // Row选项配置
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // 传给父组件点击事件
  const TableToolClick = (type: string) => {
    onCilck(type, selectedRowKeys);
  };

  const ActionClick = (e: any, key: any) => {
    onCilck(e.target.innerText, key);
  };

  const handleTableChange = (page: any, pageSize: any) => {
    onCilck(page, pageSize);
  };

  // 判断选择数量
  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div
      className={styles.content}
      style={{ display: display ? 'none' : 'block' }}
    >
      <div style={{ margin: '10px 0' }}>
        <Space>{tableBts}</Space>
      </div>
      <ConfigProvider locale={zhCN}>
        <Table
          rowSelection={tableBts?.length > 0 ? rowSelection : (false as any)}
          scroll={Scroll}
          columns={columns}
          rowKey={(record) => record.key}
          dataSource={Data}
          loading={Loading}
          pagination={false}
        />
        <Pagination
          style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}
          total={Data?.length}
          showTotal={(total, range) =>
            `第 ${range[0]} 到 ${range[1]} 条， 共 ${total} 条记录。`
          }
          defaultPageSize={10}
          defaultCurrent={1}
          onChange={handleTableChange}
        />
      </ConfigProvider>
    </div>
  );
};

export default FormList;
