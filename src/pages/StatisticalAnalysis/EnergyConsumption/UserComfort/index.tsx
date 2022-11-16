import { PageHeader } from '@/components/SubHeader';
import ZKTable from '@/components/ZKTable';
import { useBoolean } from 'ahooks';
import { Button, DatePicker, Form, Input, Select, Space } from 'antd';
import { useRef } from 'react';
import styles from './index.less';

const { RangePicker } = DatePicker;

const UserComfort = () => {
  const [form] = Form.useForm();
  const [state, { toggle }] = useBoolean(false);
  const shareRef = useRef<any>();

  // 表格数据
  const columns = [
    {
      title: '用户侧支路名称',
      dataIndex: 'name',
    },
    {
      title: '站点名称',
      dataIndex: 'gender',
    },
    {
      title: '所属项目',
      dataIndex: 'gender',
    },
    {
      title: '站内供水温度(℃)',
      dataIndex: 'gender',
    },
    {
      title: '站内回水温度(℃)',
      dataIndex: 'gender',
    },
    {
      title: '末端供水温度(℃)',
      dataIndex: 'gender',
    },
    {
      title: '末端回水温度(℃))',
      dataIndex: 'gender',
    },
    {
      title: '站内平均流量(t/h)',
      dataIndex: 'gender',
    },
    {
      title: '末端平均流量(t/h)',
      dataIndex: 'gender',
    },
    {
      title: '站内冷(热)量(kW·h)',
      dataIndex: 'gender',
    },
    {
      title: '末端总管冷(热)量(kW·h)',
      dataIndex: 'gender',
    },
    {
      title: '末端室内温度(℃)',
      dataIndex: 'gender',
    },
    {
      title: '日期',
      dataIndex: 'cell',
    },
  ];

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
            <Input placeholder="请输入用户侧支路搜索" />
          </Form.Item>
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

  return (
    <>
      <PageHeader />
      <div className={styles.content}>
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

export default UserComfort;
