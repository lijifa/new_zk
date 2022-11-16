/*
 * 表格上方操作按钮组件（添加、删除、修改）
 */

import { Button, Divider, Space, Typography } from 'antd';

interface BtnListType {
  btnList: string[]; // 按钮枚举【add/edit/del/export】
  otherBtnFun: Function; // 更多其他按钮
  btnCilck: any; // 按钮点击事件
  Loading?: boolean; // 列表是否加载完成
  checkItem?: any[]; // 列表选项
}

const OperationBtn = (props: BtnListType) => {
  const { btnCilck, checkItem, otherBtnFun } = props;
  // 顶部按钮点击事件
  const tableToolClick = (btnType: string) => {
    if (btnCilck && typeof btnCilck === 'function') {
      btnCilck(btnType, checkItem);
    }
  };

  // 判断选择数量
  const hasSelected = checkItem?.length === 1;

  const btnTplList = {
    add: (
      <Button key="add" type="primary" onClick={() => tableToolClick('add')}>
        添加
      </Button>
    ),
    edit: (
      <Button
        key="edit"
        type="primary"
        disabled={!hasSelected}
        className="zkTableEditBtn"
        onClick={() => tableToolClick('edit')}
      >
        修改
      </Button>
    ),
    del: (
      <Button
        key="del"
        type="primary"
        danger
        disabled={!hasSelected}
        onClick={() => tableToolClick('del')}
      >
        删除
      </Button>
    ),
    export: (
      <Button
        key="export"
        type="primary"
        disabled={!hasSelected}
        onClick={() => tableToolClick('export')}
      >
        导出
      </Button>
    ),
  };

  // 生成操作按钮
  const createBtnList = () => {
    const { btnList } = props;
    let btnTpl: JSX.Element[] = [];
    btnTpl = btnList.map((item: string) => {
      return btnTplList[item];
    });

    // 如果预支按钮不够，可以从外部定义
    if (otherBtnFun && typeof otherBtnFun === 'function') {
      let otherBtn = otherBtnFun(checkItem);
      btnTpl.push(...otherBtn);
    }

    return btnTpl;
  };

  return (
    <>
      <Space align="center" style={{ marginBottom: 12, width: '100%' }}>
        {createBtnList()}
      </Space>
    </>
  );
};

export default OperationBtn;

/* 
  表格列表操作按钮组件
*/
interface RowOperBtnType {
  btnList: {
    key: string;
    text: string;
  }[]; // 按钮名称 {key, text}
  btnCilck: any; // 操作按钮按钮点击事件
  rowData?: any; // 当前行数据
  isDisabled?: boolean; // 是否按钮禁用
}
export const RowOperBtn = (props: RowOperBtnType) => {
  const { btnList, btnCilck, rowData, isDisabled } = props;

  // 表格操作列点击事件
  const rowItemClick = (key: string) => {
    if (btnCilck && typeof btnCilck === 'function') {
      btnCilck(key, rowData);
    }
  };

  // 生成操作按钮
  const createBtnList = () => {
    let btnTpl: JSX.Element[] = [];
    btnTpl = btnList.map((item, index) => {
      return (
        <Typography.Link
          key={index}
          onClick={() => {
            rowItemClick(item.key);
          }}
          disabled={isDisabled}
        >
          {item.text}
        </Typography.Link>

        // <Button
        //   key={index}
        //   type="link"
        //   size="small"
        //   disabled={isDisabled}
        //   onClick={() => {
        //     rowItemClick(item.key);
        //   }}
        // >
        //   {item.text}
        // </Button>
      );
    });
    return btnTpl;
  };

  return (
    <>
      <Space align="center" split={<Divider type="vertical" />} size={1}>
        {createBtnList()}
      </Space>
    </>
  );
};
