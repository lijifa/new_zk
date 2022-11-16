import { PageHeader } from '@/components/SubHeader';
import ZKTable from '@/components/ZKTable';
import { useBoolean } from 'ahooks';
import { Button, Form, Input, Space } from 'antd';
import { useRef } from 'react';
import styles from './index.less';

// 表格数据
const columns = [
  {
    title: '部门名称',
    dataIndex: 'name',
  },
  {
    title: '显示顺序',
    dataIndex: 'age',
  },
  {
    title: '联系人姓名',
    dataIndex: 'address',
  },
  {
    title: '联系人电话',
    dataIndex: 'address',
  },
  {
    title: '创建时间',
    dataIndex: 'address',
  },
];

const UserCheck = () => {
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
            <Input placeholder="请输入部门名称搜索" />
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
          btnList={['add']}
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
          isRowCheck={false}
          // checkboxType="radio"
          // disabledFun={(res: { gender: string }) => {
          //   return {
          //     disabled: isDisabledFun(res), // 过滤不可选择的行属性
          //     // name: record.gender,
          //   };
          // }}
          otherBtnFun={(e: any) => {
            return [
              <Button
                key="other1"
                type="primary"
                onClick={() => {
                  console.log(e);
                }}
                style={{ background: '#23c6c8', border: '#23c6c8' }}
                // disabled={!(e.length === 1)}
              >
                展开/折叠
              </Button>,
              <div className={styles.warnText} key={'warnText'}>
                注：请按照同一层级进行从小到大排序
              </div>,
            ];
          }}
          ref={shareRef}
        />
      </div>
    </>
  );
};

export default UserCheck;
