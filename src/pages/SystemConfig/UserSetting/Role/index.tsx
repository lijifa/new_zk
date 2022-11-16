import { RowOperBtn } from '@/components/OperationBtn';
import { PageHeader } from '@/components/SubHeader';
import ZKTable from '@/components/ZKTable';
import { useBoolean } from 'ahooks';
import { Button, DatePicker, Form, Input, Select, Space } from 'antd';
import { useRef } from 'react';

const { RangePicker } = DatePicker;

const Jobs = () => {
  const [form] = Form.useForm();
  const [state, { toggle }] = useBoolean(false);
  const shareRef = useRef<any>();

  // 表格数据
  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
    },
    {
      title: '所属企业',
      dataIndex: 'age',
    },
    {
      title: '权限字符',
      dataIndex: 'address',
    },
    {
      title: '显示顺序',
      dataIndex: 'address',
    },
    {
      title: '状态',
      dataIndex: 'address',
    },
    {
      title: '创建时间',
      dataIndex: 'address',
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

  // 点击行内操作按钮回调
  const clickRowbtn = (e: string, data: any) => {
    console.log('e：按钮标识(key);\n data当前操作行数据');
    console.log(e);
    console.log(data);
  };

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
            <Input placeholder="输入角色名称搜索" />
          </Form.Item>
          <Form.Item name="username">
            <Input placeholder="输入企业名称搜索" />
          </Form.Item>
          <Form.Item name="username">
            <Input placeholder="输入权限字符搜索" />
          </Form.Item>
          <Form.Item name="username">
            <RangePicker />
          </Form.Item>
          <Form.Item name="email">
            <Select
              placeholder="---请选择---"
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
                  label: '启用',
                },
                {
                  value: '2',
                  label: '停用',
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
