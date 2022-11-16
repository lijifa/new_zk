import { RowOperBtn } from '@/components/OperationBtn';
import { PageHeader } from '@/components/SubHeader';
import ZKTable from '@/components/ZKTable';
import { useBoolean } from 'ahooks';
import { Button, DatePicker, Form, Input, Select, Space } from 'antd';
import { useRef } from 'react';

const { RangePicker } = DatePicker;

const HvacDiagramSet = () => {
  const [form] = Form.useForm();
  const [state, { toggle }] = useBoolean(false);
  const shareRef = useRef<any>();

  // 表格数据
  const columns = [
    {
      title: '站点名称',
      dataIndex: 'gender',
    },
    {
      title: '所属项目',
      dataIndex: 'gender',
    },
    {
      title: '室外环境温度(℃)',
      dataIndex: 'gender',
    },
    {
      title: '室外环境湿度(%)',
      dataIndex: 'gender',
    },
    {
      title: '耗电量(kW·h))',
      dataIndex: 'gender',
    },
    {
      title: '用电费用(元))',
      dataIndex: 'gender',
    },
    {
      title: '耗水量(m³)',
      dataIndex: 'gender',
    },
    {
      title: '用水费用(元)',
      dataIndex: 'gender',
    },
    {
      title: '耗气量(Nm³)',
      dataIndex: 'gender',
    },
    {
      title: '用气费用(元)',
      dataIndex: 'gender',
    },
    {
      title: '日期',
      dataIndex: 'cell',
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
            <Input placeholder="请输入站点名称搜索" />
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
          <Form.Item name="email">
            <Select
              placeholder="请选择所属项目"
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
        <PageHeader />
        <div className={'zkTableContent'}>
          {advanceSearchForm}

          <ZKTable
            btnList={['export']}
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
      </div>
    </>
  );
};
export default HvacDiagramSet;
