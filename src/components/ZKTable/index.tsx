import OperationBtn from '@/components/OperationBtn';
import { useAntdTable } from 'ahooks';
import { Table } from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

interface Result {
  total: number;
  list: Object[];
}

// 获取表格数据
// const getTableData = (
//   { current, pageSize },
//   formData: Object,
// ): Promise<Result> => {
//   let query = `page=${current}&size=${pageSize}`;
//   Object.entries(formData).forEach(([key, value]) => {
//     if (value) {
//       query += `&${key}=${value}`;
//     }
//   });

//   return fetch(`https://randomuser.me/api?results=55&${query}`)
//     .then((res) => res.json())
//     .then((res) => ({
//       total: res.info.results,
//       list: res.results,
//     }));
// };

const ZKTable = forwardRef((props: any, ref) => {
  const {
    searchForm, // 表单实例：eg:  const [form] = Form.useForm();
    tableColumns, // 表格列字段
    tableDataFun, //  获取表格数据的请求
    defaultFormItem, // 搜索表单中的默认值：eg:   { name: 'hello', email: 'abc@gmail.com', gender: 'female' }
    zkTableProps, // antd中的表格参数
    clickOperBtn, // 操作按钮
    rowId, // 表单列表中的唯一ID, 默认：id
    checkboxType, // 列表选择项类型[checkbox | radio]
    isRowCheck = true, // 是否需要列表前的勾选组件[true | false]
    disabledFun, // 是否需要被禁用的列表项函数：需要返回一个[true | false]
    btnList, // 更多的表格上方按钮, 默认：['add','edit', 'del']
    otherBtnFun, // 更多的表格上方按钮, 必须要返回按钮数组
  } = props;
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // 获取表格数据
  // const getTableData = (
  //   { current, pageSize }: { current: number; pageSize: number },
  //   formData: Object,
  // ): Promise<Result> => {
  //   let query = `page=${current}&size=${pageSize}`;
  //   Object.entries(formData).forEach(([key, value]) => {
  //     if (value) {
  //       query += `&${key}=${value}`;
  //     }
  //   });

  //   return fetch(`https://randomuser.me/api?results=55&${query}`)
  //     .then((res) => res.json())
  //     .then((res) => {
  //       setSelectedRowKeys([]);
  //       return {
  //         total: res.info.results,
  //         list: res.results,
  //       };
  //     });
  // };

  const getTableData = (
    { current, pageSize }: { current: number; pageSize: number },
    formData: Object,
  ): Promise<Result> => {
    const paramData = { ...formData, ...{ pageNum: current, pageSize } };

    if (tableDataFun && typeof tableDataFun === 'function') {
      return tableDataFun(paramData);
    } else {
      return new Promise((resolve) => {
        resolve({
          total: 0,
          list: [],
        });
      });
    }
  };

  // 列表回到钩子
  const { loading, tableProps, search, params } = useAntdTable(getTableData, {
    form: searchForm,
    defaultParams: [{ current: 1, pageSize: 10 }, defaultFormItem],
    defaultType: 'advance',
  });
  const { type, changeType, submit, reset } = search;

  // 列表行多选
  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    selectedRows: any,
  ) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    console.log('selectedRows changed: ', selectedRows);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    // selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record: any) => {
      if (disabledFun && typeof disabledFun === 'function') {
        return disabledFun(record);
      }
    }, // 过滤不可选择的行属性
  };

  // 点击搜索、重置按钮事件回调
  const clickSearchBtn = (type: string) => {
    switch (type) {
      case 'submit':
        submit();
        break;
      case 'reset':
        reset();
        break;
      case 'changeType':
        console.log('changeType');
        break;

      default:
        break;
    }
  };

  // 向父层输出对外的搜索点击事件
  useImperativeHandle(ref, () => ({
    clickSearchBtn,
  }));

  return (
    <>
      <OperationBtn
        btnList={btnList ? btnList : ['add', 'edit', 'del']}
        Loading={loading}
        btnCilck={(t: string, d: any) => {
          console.log('t：按钮的类型【add/edit/del/export】;\n d：选中行数据');
          console.log(t, d);
          console.log('点击表格上方操作按钮回调');

          // console.log(_.random(0, 5));
          // toggle();
          if (clickOperBtn && typeof clickOperBtn === 'function') {
            clickOperBtn(t, d);
          }
        }}
        checkItem={selectedRowKeys}
        otherBtnFun={(rowData: any) => {
          if (otherBtnFun && typeof otherBtnFun === 'function') {
            return otherBtnFun(rowData);
          } else {
            return [];
          }
        }}
      />
      <Table
        rowSelection={
          isRowCheck
            ? {
                type: checkboxType ? checkboxType : 'checkbox',
                ...rowSelection,
              }
            : false
        }
        columns={tableColumns}
        rowKey={rowId ? rowId : 'email'}
        {...tableProps}
        {...zkTableProps}
        scroll={{ y: 'calc(100vh - 350px)' }}
      />

      {/* <div style={{ background: '#f5f5f5', padding: 8 }}>
        <p>Current Table: {JSON.stringify(params[0])}</p>
        <p>Current Form: {JSON.stringify(params[1])}</p>
      </div> */}
    </>
  );
});
export default ZKTable;
