import { PageHeader } from '@/components/SubHeader';
import ZKTable from '@/components/ZKTable';
import { useBoolean } from 'ahooks';
import { Button, Form, Input, Space } from 'antd';
import { useRef } from 'react';

// 表格数据
const columns = [
  {
    title: '岗位名称',
    dataIndex: 'name',
  },
  {
    title: '创建人',
    dataIndex: 'age',
  },
  {
    title: '创建时间',
    dataIndex: 'address',
  },
];

const Jobs = () => {
  const [form] = Form.useForm();
  const [state, { toggle }] = useBoolean(false);
  const shareRef = useRef<any>();

  // 点击搜索、重置按钮
  const searchOper = (type: string) => {
    shareRef?.current?.clickSearchBtn(type);
  };

  // 高级搜索栏Form
  const advanceSearchForm = (
    <div className="zkSearchBox">
      <Form form={form}>
        <Space align="center">
          <Form.Item name="username">
            <Input placeholder="请输入岗位名称搜索" />
          </Form.Item>

          <Button type="primary" onClick={() => searchOper('submit')}>
            搜索
          </Button>
          <Button onClick={() => searchOper('reset')}>重置</Button>
        </Space>
      </Form>
    </div>
  );

  return (
    <>
      <PageHeader />
      <div className={'zkTableContent'}>
        {advanceSearchForm}

        <ZKTable
          btnList={['add', 'edit', 'del']}
          searchForm={form}
          tableColumns={columns}
          clickOperBtn={(t: string, d: any) => {
            console.log(
              't：按钮的类型【add/edit/del/export】;\n d：选中行数据',
            );
            console.log(t, d);
            console.log('点击表格上方操作按钮回调');
            toggle();
          }}
          // isRowCheck={false}
          // checkboxType="radio"
          // disabledFun={(res: { gender: string }) => {
          //   return {
          //     disabled: isDisabledFun(res), // 过滤不可选择的行属性
          //     // name: record.gender,
          //   };
          // }}
          // otherBtnFun={(e: any) => {
          //   return [
          //     <Button
          //       key="other1"
          //       type="primary"
          //       onClick={() => {
          //         console.log(e);
          //       }}
          //       disabled={!(e.length === 1)}
          //     >
          //       其他
          //     </Button>,
          //   ];
          // }}
          ref={shareRef}
        />
      </div>
    </>
  );
};

export default Jobs;
