interface Props {
  onClose: Function; // 关闭按钮回调方法
  onSubmit: Function; // 提交按钮回调方法
}
import ModalFooter from '@/components/ModalFooter';
import ZKTable from '@/components/ZKTable';
import { getalarmNoticeList } from '@/services/Ralis/WarningList';
import {
  InfoCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { useBoolean } from 'ahooks';
import type { RadioChangeEvent } from 'antd';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Upload,
} from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useRef, useState } from 'react';
import styles from './index.less';

// 添加照片
const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const Add = (props: Props) => {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState<any>([]);
  const [state, { toggle }] = useBoolean(false);
  const [participants, setParticipants] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [value, setValue] = useState(1);

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
    {
      title: '结果',
      align: 'center',
      dataIndex: 'page_display',
      width: 100,
    },
  ];

  // 表格头部数据
  const SecondColumns: any = [
    {
      title: '保养人员',
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

  const uploadButton = (
    <div>{loading ? <LoadingOutlined /> : <PlusOutlined />}</div>
  );

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

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
            label="巡检单号："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            label="巡检名称"
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input placeholder="请输入巡检名称" />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            label="巡检时间"
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              placeholder="请选择巡检时间"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={'space-between'}>
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
        <Col span={7}>
          <Form.Item
            label="巡检方式："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <DatePicker
              placeholder="请选择巡检方式"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={'space-between'}>
        <Col span={7}>
          <Form.Item
            label="巡检结果："
            name="diagram-radio"
            rules={[{ required: true, message: '必填' }]}
          >
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>正常</Radio>
              <Radio value={2}>异常</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <span className={styles.warn_text}>
            {' '}
            <InfoCircleOutlined style={{ marginRight: 5 }} />
            巡检内容与所属系统相关
          </span>
          <Form.Item
            label="巡检内容："
            name="diagram-name"
            rules={[{ required: true, message: '' }]}
          >
            {/* 表单 */}
            <Button
              type="primary"
              style={{ marginBottom: 10 }}
              onClick={toggle}
            >
              选择指标
            </Button>
            <Table
              pagination={false}
              columns={defaultColumns}
              dataSource={tableData}
              bordered
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <span className={styles.warn_text}>
            {' '}
            <InfoCircleOutlined style={{ marginRight: 5 }} />
            巡检人员与所属站点相关
          </span>
          <Form.Item
            label="巡检人员："
            name="diagram-name"
            rules={[{ required: true, message: '' }]}
          >
            {/* 表单 */}
            <Button
              type="primary"
              style={{ marginBottom: 10 }}
              onClick={() => setParticipants(true)}
            >
              选择人员
            </Button>
            <Table
              pagination={false}
              columns={SecondColumns}
              dataSource={tableData}
              bordered
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Item
            label="上传巡检照片："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
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
      title: '标准名称',
      dataIndex: 'businessAlarmRuleTempId',
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
            <Input placeholder="请输入指标项搜索" />
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
            <InfoCircleOutlined style={{ marginRight: 5 }} /> 请添加指标内容
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
      title: '巡检人员',
      dataIndex: 'businessAlarmRuleTempId',
    },
    {
      title: '手机号码',
      dataIndex: 'siteName',
    },
    {
      title: '所属部门',
      dataIndex: 'reason',
    },
    {
      title: '所属岗位',
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
            <Input placeholder="请输入巡检人员姓名搜索" />
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
            <InfoCircleOutlined style={{ marginRight: 5 }} /> 请添加参与人员
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
