/* 
   表格组件
*/

// 表格顶部数据格式
/* 
  columns = [
    {
      title: '用户名',     => 标题
      dataIndex: 'name',  => 字段名
    },
    {
      title: '真实姓名',
      dataIndex: 'age',
    },
  ]; 
*/

// 表格中操作列传入格式 show 是否显示   name 操作名字
/* 
    showAction={
     { show: true, name: ['查看', '删除'] }
   } 
*/

// 表格顶部按钮传入格式
/* 
    TableBts={[
      { type: 'add', text: '添加' },
      { type: 'update', text: '修改' },
      { type: 'del', text: '删除' },
    ]} 
*/

import { history } from '@umijs/max';
import { Button, ConfigProvider, Pagination, Space, Table } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import type { ColumnsType } from 'antd/es/table';
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
  key: number;
}

interface FormList {
  Columns: ColumnsType<DataType>;
  Data: DataType[] | undefined;
  Loading: boolean;
  onCilck: any;
  ShowSelection?: boolean; //是否显示多选框
  ShowPagination?: boolean; //是否显示分页
  TableBts?: {
    type: string;
    text: string;
  }[];
  ShowAction?: {
    show: boolean;
    name: string[];
  };
  Scroll?: {
    x?: string | number;
    y?: string | number;
  };
}

const FormList = (props: FormList) => {
  const {
    Columns,
    Scroll,
    Data,
    Loading,
    onCilck,
    ShowAction,
    TableBts,
    ShowSelection,
    ShowPagination,
  } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); //多选框
  const [columns, setColumns] = useState(Columns); //header数据
  const [tableBts, setTableBts] = useState([]); //设置顶部工具按钮
  const [display, setDisplay] = useState(true); //加载完成按钮和操作列之后显示table
  // 添加右侧操作列
  useEffect(() => {
    const tableTitle = Columns;
    if (ShowAction?.show) {
      tableTitle.push({
        title: '操作',
        key: 'action',
        render: (_, record, key) => (
          <Space>
            {ShowAction.name?.map((res, index) => {
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
      if (ShowAction?.show) {
        tableTitle.pop();
      }
    };
  }, [history.location.pathname, selectedRowKeys, ShowAction]);

  // 顶部工具按钮
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
              disabled={!hasExportSelected}
              size="middle"
            >
              {res.text}
            </Button>,
          );
          break;
        case 'collapse':
          TableBtns.push(
            <Button
              key={index}
              style={{ background: '#23c6c8', border: '#23c6c8' }}
              type="primary"
              onClick={() => TableToolClick('collapse')}
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
  }, [history.location.pathname, selectedRowKeys, TableBts]);

  // 监听选择到的列表
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // Row选项配置
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // 顶部按钮点击事件
  const TableToolClick = (type: string) => {
    onCilck(type, selectedRowKeys);
  };

  // 表格操作列点击事件
  const ActionClick = (event: any, key: number) => {
    onCilck(event.target.innerText, key);
  };

  // 监听page切换
  const handleTableChange = (page: number, pageSize: number) => {
    onCilck(page, pageSize);
  };

  // 判断选择数量
  const hasSelected = selectedRowKeys.length === 1;
  const hasExportSelected = selectedRowKeys.length > 0;

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
          rowSelection={ShowSelection ? rowSelection : (false as any)}
          scroll={Scroll}
          columns={columns}
          rowKey={(record) => record.key}
          dataSource={Data}
          loading={Loading}
          pagination={false}
          defaultExpandAllRows
        />
        <Pagination
          style={{
            marginTop: 10,
            display: ShowPagination ? 'flex' : 'none',
            justifyContent: 'flex-end',
          }}
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
