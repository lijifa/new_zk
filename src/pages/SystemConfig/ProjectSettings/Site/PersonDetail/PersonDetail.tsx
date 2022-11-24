import ZKTable from '@/components/ZKTable';
import { Button, Form, Input, Space } from 'antd';
import { useRef } from 'react';
import styles from './Inine.less';

const PersonDetail = (props: Props) => {
  const [form] = Form.useForm();
  const shareRef = useRef();

  // 表格列字段
  const columnsI = [
    {
      title: '姓名',
      dataIndex: 'reason',
      align: 'left',
    },
    {
      title: '手机号',
      dataIndex: 'systemName',
    },
    {
      title: '所属岗位',
      dataIndex: 'siteName',
    },
    {
      title: '所属部门',
      dataIndex: 'siteProject',
    },
  ];

  // 获取表格数据
  const getTableData = (paramData: any) => {
    return {
      total: 0,
      list: [],
    };
  };
  // 高级搜索栏Form
  const advanceSearchForm = (
    <div className="zkSearchBox">
      <Space align="center">
        <Form.Item name="name">
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Button type="primary" onClick={() => searchOper('submit')}>
          搜索
        </Button>
        <Button onClick={() => searchOper('reset')}>重置</Button>
      </Space>
    </div>
  );
  // 点击搜索、重置按钮
  const searchOper = (type: string) => {
    shareRef?.current?.clickSearchBtn(type);
  };

  return (
    <>
      <div className={styles.title}>{advanceSearchForm}</div>
      <div
        className={'zkTableContent'}
        style={{ paddingLeft: '0px', paddingRight: '0px' }}
      >
        <ZKTable
          rowId={'businessAlarmRuleTempId'}
          btnList={[]}
          searchForm={form}
          isRowCheck={false}
          tableColumns={columnsI}
          tableDataFun={getTableData}
          defaultFormItem={{}}
          clickOperBtn={(t: string, d: any) => {
            console.log(
              't：按钮的类型【add/edit/del/export】;\n d：选中行数据',
            );
            console.log(t, d);
            console.log('点击表格上方操作按钮回调');
          }}
          ref={shareRef}
        />
      </div>
    </>
  );
};

export default PersonDetail;
