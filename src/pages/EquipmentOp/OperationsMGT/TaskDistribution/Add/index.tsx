interface Props {
  onClose: Function; // 关闭按钮回调方法
  onSubmit: Function; // 提交按钮回调方法
}
interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

import ModalFooter from '@/components/ModalFooter';
import ZKTable from '@/components/ZKTable';
import { getalarmNoticeList } from '@/services/Ralis/WarningList';
import { InfoCircleOutlined } from '@ant-design/icons';
import { useBoolean } from 'ahooks';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from 'antd';
import React, { useRef, useState } from 'react';
import styles from './index.less';

const Add = (props: Props) => {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState<any>([]);
  const [state, { toggle }] = useBoolean(false);
  const [participants, setParticipants] = useState(false);

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    props.onSubmit();
  };

  // 表格头部数据
  const defaultColumns: any = [
    {
      title: '序号',
      dataIndex: 'signal_value',
      align: 'center',
      width: 100,
      render: (_: any, record: any) => {
        return record.key + 1;
      },
    },
    {
      title: '标准名称',
      dataIndex: 'page_display',
      width: 300,
    },
    {
      title: '指标项',
      dataIndex: 'page_display',
      width: 600,
    },
  ];

  // 表格头部数据
  const SecondColumns: any = [
    {
      title: '参与人员',
      dataIndex: 'signal_value',
      align: 'left',
    },
    {
      title: '手机号码',
      dataIndex: 'page_display',
    },
    {
      title: '所属部门',
      dataIndex: 'page_display',
    },
    {
      title: '所属岗位',
      dataIndex: 'page_display',
    },
  ];

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{}}
      style={{ height: 700, overflowY: 'auto' }}
    >
      <Row justify={'space-between'}>
        <Col span={7}>
          <Form.Item
            label="任务派发名称："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input placeholder="支持数字，字母，汉字，特殊字符，2-20个字" />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            label="所属系统："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Select
              placeholder="请选择所属系统"
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
                  label: '实际信号',
                },
                {
                  value: '2',
                  label: '虚拟信号',
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={7}>
          <span className={styles.warn_text}>
            <InfoCircleOutlined style={{ marginRight: 5 }} />
            站点与系统关联，请先选择系统
          </span>
          <Form.Item
            label="所属站点："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Select
              placeholder="请选择所属站点"
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
                  label: 'RS485',
                },
                {
                  value: '2',
                  label: 'WIFI',
                },
                {
                  value: '3',
                  label: 'NB-loT',
                },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={'space-between'}>
        <Col span={7}>
          <Form.Item
            label="任务派发类型："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Select
              placeholder="请选择任务派发类型"
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
                  label: 'RS485',
                },
                {
                  value: '2',
                  label: 'WIFI',
                },
                {
                  value: '3',
                  label: 'NB-loT',
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            label="派发开始时间："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <DatePicker
              placeholder="请选择派发开始时间"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            label="派发结束时间："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <DatePicker
              placeholder="请选择派发结束时间"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={'space-between'}>
        <Col span={7}>
          <Form.Item
            label="派发方式："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Select
              placeholder="请选择派发方式"
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
                  label: 'RS485',
                },
                {
                  value: '2',
                  label: 'WIFI',
                },
                {
                  value: '3',
                  label: 'NB-loT',
                },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <span className={styles.warn_text}>
            {' '}
            <InfoCircleOutlined style={{ marginRight: 5 }} />
            所选信号与所属系统相关
          </span>
          <Form.Item
            label="任务内容："
            name="diagram-name"
            rules={[{ required: true, message: '' }]}
          >
            {/* 表单 */}
            <div className={styles.table_box}>
              <Button
                type="primary"
                style={{ marginBottom: 10 }}
                onClick={toggle}
              >
                选择指标
              </Button>
              <Table
                pagination={false}
                className={styles.table}
                columns={defaultColumns}
                dataSource={tableData}
                bordered
              />
            </div>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <span className={styles.warn_text}>
            <InfoCircleOutlined style={{ marginRight: 5 }} />
            参与人员与所属站点相关
          </span>
          <Form.Item
            label="参与人员："
            name="diagram-name"
            rules={[{ required: true, message: '' }]}
          >
            {/* 表单 */}
            <div className={styles.table_box}>
              <Button
                type="primary"
                style={{ marginBottom: 10 }}
                onClick={() => setParticipants(true)}
              >
                参与人员
              </Button>
              <Table
                pagination={false}
                className={styles.table}
                columns={SecondColumns}
                dataSource={tableData}
                bordered
              />
            </div>
          </Form.Item>
        </Col>
      </Row>
      <Row justify={'space-between'}>
        <Col span={7}>
          <span className={styles.warn_text}>
            <InfoCircleOutlined style={{ marginRight: 5 }} />
            负责人与参与人员关联，请先选择参与人员
          </span>
          <Form.Item
            label="负责人："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Select
              placeholder="请选择负责人"
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
                  label: 'RS485',
                },
                {
                  value: '2',
                  label: 'WIFI',
                },
                {
                  value: '3',
                  label: 'NB-loT',
                },
              ]}
            />
          </Form.Item>
        </Col>
      </Row>
      <ModalFooter
        cancelFun={() => {
          props.onClose();
        }}
      />
      <Modal
        title="选择指标"
        open={state}
        footer={null}
        destroyOnClose={true}
        centered={true}
        onCancel={toggle}
        width={900}
        bodyStyle={{ height: '850px' }}
      >
        <SelectIndicator
          onSubmit={() => {
            toggle();
          }}
          onClose={() => {
            toggle();
          }}
        />
      </Modal>
      <Modal
        title="选择参与人员"
        open={participants}
        footer={null}
        destroyOnClose={true}
        centered={true}
        onCancel={() => setParticipants(false)}
        width={900}
        bodyStyle={{ height: '850px' }}
      >
        <Participants
          onSubmit={() => {
            setParticipants(false);
          }}
          onClose={() => {
            setParticipants(false);
          }}
        />
      </Modal>
    </Form>
  );
};

export default Add;

// 选择指标
const SelectIndicator = (props: Props) => {
  const [form] = Form.useForm();
  const [TagList, setTagList] = useState<any>([]);
  const shareRef = useRef<any>();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    props.onSubmit();
  };

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
      title: '设备名称',
      dataIndex: 'businessAlarmRuleTempId',
    },
    {
      title: '设备分类',
      dataIndex: 'siteName',
    },
    {
      title: '指标项',
      dataIndex: 'reason',
    },
  ];

  // 点击搜索、重置按钮
  const searchOper = (type: string) => {
    shareRef?.current?.clickSearchBtn(type);
  };

  // 高级搜索栏Form
  const advanceSearchForm = (
    <div className="zkSearchBox">
      <Form form={form} onFinish={onFinish}>
        <Space align="center">
          <Form.Item name="username">
            <Select
              placeholder="请选择设备分类"
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
            <Input placeholder="请输入设备名称搜索" />
          </Form.Item>

          <Button type="primary" onClick={() => searchOper('submit')}>
            搜索
          </Button>
          <Button onClick={() => searchOper('reset')}>重置</Button>
        </Space>
        <ModalFooter
          cancelFun={() => {
            props.onClose();
          }}
        />
      </Form>
    </div>
  );

  const log = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };

  const tagList = (
    <div className={styles.tags_box}>
      {TagList.length > 0 ? (
        TagList?.map((item: any) => {
          return (
            <Tag closable onClose={log}>
              {item.businessAlarmRuleTempId}
            </Tag>
          );
        })
      ) : (
        <div style={{ height: 40, lineHeight: '40px' }}>
          <span className={styles.warn_text} style={{ marginLeft: 0 }}>
            <InfoCircleOutlined style={{ marginRight: 5 }} />
            请添加指标内容
          </span>
        </div>
      )}
    </div>
  );

  const changeRowCheck = (event: any) => {
    setTagList(event);
  };

  return (
    <>
      <div className={'zkTableContent'}>
        {advanceSearchForm}
        {tagList}
        <ZKTable
          btnList={[]}
          onRowCheckBoxFun={(e: any) => changeRowCheck(e)}
          rowId={'businessAlarmRuleTempId'}
          tableColumns={columns}
          searchForm={form}
          tableDataFun={getTableData}
        />
      </div>
    </>
  );
};

// 参与人员
const Participants = (props: Props) => {
  const [form] = Form.useForm();
  const [TagList, setTagList] = useState<any>([]);
  const shareRef = useRef<any>();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    props.onSubmit();
  };

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
      title: '设备名称',
      dataIndex: 'businessAlarmRuleTempId',
    },
    {
      title: '设备分类',
      dataIndex: 'siteName',
    },
    {
      title: '指标项',
      dataIndex: 'reason',
    },
  ];

  // 点击搜索、重置按钮
  const searchOper = (type: string) => {
    shareRef?.current?.clickSearchBtn(type);
  };

  // 高级搜索栏Form
  const advanceSearchForm = (
    <div className="zkSearchBox">
      <Form form={form} onFinish={onFinish}>
        <Space align="center">
          <Form.Item name="username">
            <Input placeholder="请输入参与人员姓名搜索" />
          </Form.Item>
          <Form.Item name="username">
            <Input placeholder="输入所属部门搜索" />
          </Form.Item>
          <Form.Item name="username">
            <Select
              placeholder="选择所属岗位"
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

          <Button type="primary" onClick={() => searchOper('submit')}>
            搜索
          </Button>
          <Button onClick={() => searchOper('reset')}>重置</Button>
        </Space>
        <ModalFooter
          cancelFun={() => {
            props.onClose();
          }}
        />
      </Form>
    </div>
  );

  const log = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
  };

  const tagList = (
    <div className={styles.tags_box}>
      {TagList.length > 0 ? (
        TagList?.map((item: any) => {
          return (
            <Tag closable onClose={log}>
              {item.businessAlarmRuleTempId}
            </Tag>
          );
        })
      ) : (
        <div style={{ height: 40, lineHeight: '40px' }}>
          <span className={styles.warn_text} style={{ marginLeft: 0 }}>
            <InfoCircleOutlined style={{ marginRight: 5 }} />
            请添加参与人员
          </span>
        </div>
      )}
    </div>
  );

  const changeRowCheck = (event: any) => {
    setTagList(event);
  };

  return (
    <>
      <div className={'zkTableContent'}>
        {advanceSearchForm}
        {tagList}
        <ZKTable
          btnList={[]}
          onRowCheckBoxFun={(e: any) => changeRowCheck(e)}
          rowId={'businessAlarmRuleTempId'}
          tableColumns={columns}
          searchForm={form}
          tableDataFun={getTableData}
        />
      </div>
    </>
  );
};
