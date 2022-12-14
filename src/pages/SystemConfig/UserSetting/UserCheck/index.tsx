import { RowOperBtn } from '@/components/OperationBtn';
import { PageHeader } from '@/components/SubHeader';
import ZKTable from '@/components/ZKTable';
import { useBoolean } from 'ahooks';
import { Button, Form, Input, Select, Space } from 'antd';
import { useRef } from 'react';

const HvacDiagramSet = () => {
  const [form] = Form.useForm();
  const [state, { toggle }] = useBoolean(false);
  const shareRef = useRef<any>();

  // 表格数据
  const columns = [
    {
      title: '用户名',
      dataIndex: 'name',
    },
    {
      title: '真实姓名',
      dataIndex: 'age',
    },
    {
      title: '手机号',
      dataIndex: 'address',
    },
    {
      title: '申请次数',
      dataIndex: '',
    },
    {
      title: '申请时间',
      dataIndex: '',
    },
    {
      title: '申请理由',
      dataIndex: '',
    },
    {
      title: '审核人',
      dataIndex: '',
    },
    {
      title: '审核时间',
      dataIndex: '',
    },
    {
      title: '审核状态',
      dataIndex: '',
    },
    {
      title: '操作',
      key: 'operation',
      render: (record: any) => (
        <RowOperBtn
          btnList={[
            { key: 'copy', text: '复制该组态图' },
            { key: 'detail', text: '组态图详情' },
          ]}
          btnCilck={(e: string) => {
            clickRowbtn(e, record);
          }}
          rowData={record}
          // isDisabled={isDisabledFun(record)}
        />
      ),
    },
  ];

  // 过滤不可选择的行属性
  const isDisabledFun = (res: { gender: string }) => {
    return res.gender === 'female';
  };

  // 点击行内操作按钮回调
  const clickRowbtn = (e: string, data: any) => {
    console.log('e：按钮标识(key);\n data当前操作行数据');
    console.log(e);
    console.log(data);
  };

  // 高级搜索栏Form
  const advanceSearchForm = (
    <div className="zkSearchBox">
      <Form form={form}>
        <Space align="center">
          <Form.Item name="username">
            <Input placeholder="输入用户名搜索" />
          </Form.Item>
          <Form.Item name="name">
            <Input placeholder="输入真实姓名搜索" />
          </Form.Item>
          <Form.Item name="phone">
            <Input placeholder="输入手机号搜索" />
          </Form.Item>

          <Form.Item name="email">
            <Select
              placeholder="审核状态"
              style={{ width: 200 }}
              optionFilterProp="label"
              filterOption={(input, option) =>
                (option?.label ?? '').includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={[
                {
                  value: '1',
                  label: '待审核',
                },
                {
                  value: '2',
                  label: '已通过',
                },
                {
                  value: '3',
                  label: '已拒绝',
                },
              ]}
            />
          </Form.Item>

          <Button type="primary" onClick={() => searchOper('submit')}>
            搜索
          </Button>
          <Button onClick={() => searchOper('reset')}>重置</Button>
        </Space>
      </Form>
    </div>
  );

  // 点击搜索、重置按钮
  const searchOper = (type: string) => {
    shareRef?.current?.clickSearchBtn(type);
  };

  return (
    <>
      <div>
        <PageHeader />
        <div className={'zkTableContent'}>
          {advanceSearchForm}

          <ZKTable
            btnList={[]}
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
      </div>
    </>
  );
};
export default HvacDiagramSet;
