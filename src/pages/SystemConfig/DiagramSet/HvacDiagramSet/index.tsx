import { RowOperBtn } from '@/components/OperationBtn';
import { PageHeader } from '@/components/SubHeader';
import ZKTable from '@/components/ZKTable';
import { useBoolean } from 'ahooks';
import { Button, DatePicker, Form, Input, Modal, Select, Space } from 'antd';
import { useRef } from 'react';
import Add from './Add';

const { RangePicker } = DatePicker;

const HvacDiagramSet = () => {
  const [form] = Form.useForm();
  const [state, { toggle }] = useBoolean(false);
  const shareRef = useRef();

  const columns = [
    {
      title: '组态图名称',
      dataIndex: ['name', 'last'],
    },
    {
      title: '组态图类型',
      dataIndex: 'phone',
    },
    {
      title: '所属站点',
      dataIndex: 'email',
    },
    {
      title: '创建人',
      dataIndex: 'gender',
    },
    {
      title: '创建时间',
      dataIndex: ['registered', 'date'],
    },
    {
      title: '操作',
      key: 'operation',
      render: (record: any) => (
        <RowOperBtn
          btnList={[
            { key: 'detail', text: '详情' },
            { key: 'close', text: '关闭' },
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
          <Form.Item name="name">
            <Input placeholder="请输入组态图名称搜索" />
          </Form.Item>

          <Form.Item name="email">
            <Select
              placeholder="请选择组态图类型"
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
                  label: '供冷',
                },
                {
                  value: '2',
                  label: '供热',
                },
              ]}
            />
          </Form.Item>

          <Form.Item name="phone">
            <Select
              placeholder="请选择站点"
              showSearch
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
                  label: 'A光合谷A能源站',
                },
                {
                  value: '2',
                  label: 'B光合谷B能源站',
                },
                {
                  value: '3',
                  label: 'C光合谷C能源站',
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="createData">
            <RangePicker />
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
        <PageHeader title="暖通组态配置" />
        <div className={'zkTableContent'}>
          {advanceSearchForm}

          <ZKTable
            btnList={['add', 'edit', 'del']}
            searchForm={form}
            tableColumns={columns}
            defaultFormItem={{
              name: 'hello',
              email: '1',
              phone: '2',
            }}
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
      </div>
      <Modal
        title="添加"
        open={state}
        footer={null}
        destroyOnClose={true}
        centered={true}
        onCancel={toggle}
        width={650}
        bodyStyle={{ height: '400px' }}
      >
        <Add
          onSubmit={() => {
            toggle();
          }}
          onClose={() => {
            toggle();
          }}
        />
      </Modal>
    </>
  );
};
export default HvacDiagramSet;
