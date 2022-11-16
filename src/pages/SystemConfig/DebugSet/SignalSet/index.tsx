import { RowOperBtn } from '@/components/OperationBtn';
import { PageHeader } from '@/components/SubHeader';
import ZKTable from '@/components/ZKTable';
import { useBoolean } from 'ahooks';
import { Button, Form, Input, Select, Space } from 'antd';
import React, { memo, useRef } from 'react';

const SignalSet = memo(() => {
  const [form] = Form.useForm();
  const [state, { toggle }] = useBoolean(false);
  const shareRef = useRef<any>();

  // 表格数据
  const columns = [
    {
      title: '信号模板',
      dataIndex: 'name',
    },
    {
      title: '信号种类',
      dataIndex: 'age',
    },
    {
      title: '信号模板编号',
      dataIndex: 'address',
    },
    {
      title: '所属站点',
      dataIndex: 'address',
    },
    {
      title: '所属网关',
      dataIndex: 'address',
    },
    {
      title: '设备名称',
      dataIndex: 'address',
    },
    {
      title: '协议类型',
      dataIndex: 'address',
    },
    {
      title: '协议格式值',
      dataIndex: 'address',
    },
    {
      title: '信号读取方式',
      dataIndex: 'address',
    },
    {
      title: '设备绑定状态',
      dataIndex: 'address',
    },
    {
      title: '启停状态',
      dataIndex: 'address',
    },
    {
      title: '是否累计值',
      dataIndex: 'address',
    },
    {
      title: '操作',
      key: 'operation',
      render: (record: any) => (
        <RowOperBtn
          btnList={[
            { key: 'copy', text: '启用' },
            { key: 'detail', text: '信号模板详情' },
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
            <Input placeholder="请输入信号模板编号搜索" />
          </Form.Item>
          <Form.Item name="username">
            <Input placeholder="请输入信号模板名称搜索" />
          </Form.Item>
          <Form.Item name="email">
            <Select
              placeholder="请选择信号种类"
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
          <Form.Item name="username">
            <Input placeholder="请输入协议格式值搜索" />
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
          </Form.Item>{' '}
          <Form.Item name="email">
            <Select
              placeholder="请选择所属网关"
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
              placeholder="请选择设备绑定状态"
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
              placeholder="请选择启停状态"
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
              placeholder="请选择是否累计值"
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
          otherBtnFun={(e: any) => {
            return [
              <div style={{ marginLeft: 20, color: 'red' }} key={'warnText'}>
                注：只允许修改停用状态的信号模板
              </div>,
            ];
          }}
        />
      </div>
    </>
  );
});

export default SignalSet;
