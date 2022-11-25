import DelWarnModal from '@/components/DelWarnModal';
import { RowOperBtn } from '@/components/OperationBtn';
import { PageHeader } from '@/components/SubHeader';
import ZKTable from '@/components/ZKTable';
import { getalarmNoticeList } from '@/services/Ralis/WarningList';
import { useBoolean } from 'ahooks';
import { Button, DatePicker, Form, Input, Modal, Select, Space } from 'antd';
import { memo, useRef, useState } from 'react';
import Add from './Add';
import Details from './Details';

const { RangePicker } = DatePicker;

const InspectionRecord = memo(() => {
  const [form] = Form.useForm();
  const [state, { toggle }] = useBoolean(false);
  const shareRef = useRef<any>();
  const [del, setDel] = useState(false);
  const [detail, setDetail] = useState(false);

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

  // 表格数据
  const columns = [
    {
      title: '巡检单号',
      dataIndex: 'name',
    },
    {
      title: '巡检名称',
      dataIndex: 'age',
    },
    {
      title: '巡检日期',
      dataIndex: 'address',
    },
    {
      title: '巡检方式',
      dataIndex: 'address',
    },
    {
      title: '所属站点',
      dataIndex: 'address',
    },
    {
      title: '所属系统',
      dataIndex: 'address',
    },
    {
      title: '主巡检人',
      dataIndex: 'address',
    },
    {
      title: '提交时间',
      dataIndex: 'address',
    },
    {
      title: '巡检结果',
      dataIndex: 'address',
    },
    {
      title: '操作',
      key: 'operation',
      render: (record: any) => (
        <RowOperBtn
          btnList={[{ key: 'detail', text: '巡检标准详情' }]}
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
    if (e == 'detail') {
      setDetail(true);
    }
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
            <Input placeholder="请输入巡检单号搜索" />
          </Form.Item>
          <Form.Item name="username">
            <Input placeholder="请输入巡检名称搜索" />
          </Form.Item>
          <Form.Item name="username">
            <Select
              placeholder="请选择所属系统"
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
                  label: '在职',
                },
                {
                  value: '2',
                  label: '离职',
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="username">
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
                  label: '在职',
                },
                {
                  value: '2',
                  label: '离职',
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="username">
            <Select
              placeholder="请选择巡检方式"
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
                  label: '在职',
                },
                {
                  value: '2',
                  label: '离职',
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="username">
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
      <div className={'zkTableContent'}>
        {advanceSearchForm}

        <ZKTable
          btnList={['add', 'edit', 'del']}
          searchForm={form}
          tableDataFun={getTableData}
          tableColumns={columns}
          clickOperBtn={(t: string, d: any) => {
            switch (t) {
              case 'add':
                toggle();
                break;
              case 'edit':
                toggle();
                break;
              case 'del':
                setDel(true);
                break;
              default:
                break;
            }
          }}
          ref={shareRef}
        />
      </div>
      {/* 删除弹框 */}
      <DelWarnModal
        Show={del}
        Delete={() => {
          console.log('父级删除');
          setDel(false);
        }}
        Cancal={() => {
          console.log('父级取消');
          setDel(false);
        }}
      />
      <Modal
        title="新增巡检补录"
        open={state}
        footer={null}
        destroyOnClose={true}
        centered={true}
        onCancel={toggle}
        width={1400}
        bodyStyle={{ height: '770px' }}
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
      <Modal
        title="巡检补录详情"
        open={detail}
        footer={null}
        destroyOnClose={true}
        centered={true}
        onCancel={() => setDetail(false)}
        width={1400}
        bodyStyle={{ height: '770px' }}
      >
        <Details />
      </Modal>
    </>
  );
});

export default InspectionRecord;
