import { RowOperBtn } from '@/components/OperationBtn';
import { PageHeader } from '@/components/SubHeader';
import ZKTable from '@/components/ZKTable';
import { getalarmNoticeList } from '@/services/Ralis/WarningList';
import { useBoolean } from 'ahooks';
import { Button, DatePicker, Form, Input, Modal, Select, Space } from 'antd';
import { useRef } from 'react';
import Add from './Add/Add';

const { RangePicker } = DatePicker;

const Logs = () => {
  const [form] = Form.useForm();
  const [state, { toggle }] = useBoolean(false);
  const shareRef = useRef();

  // 表格列字段
  const columns = [
    {
      title: '系统模块',
      dataIndex: 'reason',
      align: 'left',
    },
    {
      title: '操作类型',
      dataIndex: 'systemName',
    },
    {
      title: '操作人员',
      dataIndex: 'siteName',
    },
    {
      title: '真实姓名',
      dataIndex: 'siteProject',
    },
    {
      title: '主机',
      dataIndex: 'siteSystem',
    },
    {
      title: '操作地点',
      dataIndex: 'businessAlarmRuleTempId',
    },
    {
      title: '操作状态',
      dataIndex: 'businessAlarmRuleTempId',
    },
    {
      title: '创建时间',
      dataIndex: ['alarmTime'],
    },
    {
      title: '操作',
      key: 'operation',
      render: (record: any) => (
        <RowOperBtn
          btnList={[{ key: 'detail', text: '详细' }]}
          btnCilck={(e: string) => {
            clickRowbtn(e, record);
            toggle()
          }}
          rowData={record}
          // isDisabled={isDisabledFun(record)}
        />
      ),
    },
  ];

  // 获取表格数据
  const getTableData = (paramData: any) => {
    return getalarmNoticeList(paramData).then((data) => {
      if (data.code == 0) {
        return {
          total: data.total,
          list: data.rows,
        };
      }
      return {
        total: 0,
        list: [],
      };
    });
  };

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
        <PageHeader />
        <div className={'zkTableContent'}>
          {advanceSearchForm}

          <ZKTable
            rowId={'businessAlarmRuleTempId'}
            btnList={[]}
            searchForm={form}
            isRowCheck={false}
            tableColumns={columns}
            tableDataFun={getTableData}
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
            ref={shareRef}
          />
        </div>
      </div>
      <Modal
        title="操作日志详细"
        open={state}
        footer={null}
        destroyOnClose={true}
        centered={true}
        onCancel={toggle}
        width={800}
        bodyStyle={{ height: '703px',padding:'50px 40px 0px 80px'}}
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
export default Logs;
