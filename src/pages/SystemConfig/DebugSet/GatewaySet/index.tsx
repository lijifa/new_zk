import { PageHeader } from '@/components/SubHeader';
import ZKTable from '@/components/ZKTable';
import { useBoolean } from 'ahooks';
import { Button, Form, Input, Select, Space } from 'antd';
import React, { memo, useRef } from 'react';

// 表格数据
const columns = [
  {
    title: '网关名称',
    dataIndex: 'name',
  },
  {
    title: '所属站点',
    dataIndex: 'age',
  },
  {
    title: '网关类型',
    dataIndex: 'address',
  },
  {
    title: '最后通讯时间',
    dataIndex: 'address',
  },
  {
    title: '创建人',
    dataIndex: 'address',
  },
  {
    title: '创建时间',
    dataIndex: 'address',
  },
];

const GatewaySet = memo(() => {
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
            <Input placeholder="请输入网关名称搜索" />
          </Form.Item>
          <Form.Item name="email">
            <Select
              placeholder="请选择所属站点"
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
          <Form.Item name="email">
            <Select
              placeholder="请选择网关类型"
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
          ref={shareRef}
        />
      </div>
    </>
  );
});

export default GatewaySet;
