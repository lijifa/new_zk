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

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  handleSave: (record: Item) => void;
}

interface EditableRowProps {
  index: number;
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
import type { InputRef } from 'antd';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tag,
  Upload,
} from 'antd';
import type { FormInstance } from 'antd/es/form';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './index.less';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

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
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

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
      title: '规则名称',
      dataIndex: 'page_display',
      width: 300,
    },
    {
      title: '指标项',
      dataIndex: 'page_display',
      width: 600,
    },
    {
      title: '是否保养',
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

  // 表格头部数据
  const Columns: any = [
    {
      title: '辅料名称',
      dataIndex: 'signal_value',
      width: 400,
      editable: true,
    },
    {
      title: '规格型号',
      dataIndex: 'page_display',
      width: 400,
      editable: true,
    },
    {
      title: '数量',
      dataIndex: 'page_display',
      editable: true,
      width: 300,
    },
    {
      title: '单位',
      dataIndex: 'signal_status',
      editable: true,
      width: 300,
    },
    {
      title: '品牌',
      dataIndex: 'page_display',
      editable: true,
      width: 300,
    },
    {
      title: '生产厂家',
      dataIndex: 'page_display',
      width: 300,
    },
    {
      title: '操作',
      dataIndex: 'address',
      align: 'center',
      width: 100,
      render: (_: any, record: { key: React.Key }) =>
        tableData.length >= 1 ? (
          <Popconfirm
            title="确定要删除吗？"
            onConfirm={() => handleDelete(record.key)}
          >
            <a style={{ color: 'red' }}>删除</a>
          </Popconfirm>
        ) : null,
    },
  ];

  // 点击删除事件
  const handleDelete = (key: React.Key) => {
    const newData = tableData.filter((item: any) => item.key !== key);
    setTableData(newData);
  };

  const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  // 可编辑组件
  const EditableCell: React.FC<EditableCellProps> = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef<InputRef>(null);
    const form = useContext(EditableContext)!;

    useEffect(() => {
      if (editing) {
        inputRef.current!.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({ [dataIndex]: record[dataIndex] });
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item style={{ margin: 0 }} name={dataIndex}>
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{ paddingRight: 24 }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }

    return <td {...restProps}>{childNode}</td>;
  };

  const handleSave = (row: any) => {
    const newData = [...tableData];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setTableData(newData);
  };

  const columns = Columns.map((col: any) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  // 添加数据事件
  const addItem = () => {
    const newTableData = {
      key: count,
      signal_value: '',
      page_display: '',
      signal_status: (
        <Select
          placeholder="选择单位"
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
              label: '故障',
            },
            {
              value: '2',
              label: '正常',
            },
            {
              value: '3',
              label: '停止',
            },
            {
              value: '4',
              label: '开启',
            },
          ]}
        />
      ),
    };
    setTableData([...tableData, newTableData]);
    setCount(count + 1);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

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
            label="保养单号："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            label="保养名称"
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input placeholder="请输入保养名称" />
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
      </Row>
      <Row justify={'space-between'}>
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
        <Col span={7}>
          <Form.Item
            label="保养开始时间："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <DatePicker
              placeholder="请选择保养开始时间"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            label="保养结束时间："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <DatePicker
              placeholder="请选择保养结束时间"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={'space-between'}>
        <Col span={7}>
          <Form.Item
            label="保养总时长（h）："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            label="保养结果："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Select
              placeholder="请选择保养结果"
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
        <Col span={7} style={{ visibility: 'hidden' }}>
          <Form.Item
            label="保养总时长（h）："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <span className={styles.warn_text}>
            <InfoCircleOutlined style={{ marginRight: 5 }} />
            保养内容与所属系统相关
          </span>
          <Form.Item
            label="保养内容："
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
            <InfoCircleOutlined style={{ marginRight: 5 }} />
            保养人员与所属站点相关
          </span>
          <Form.Item
            label="保养人员："
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
        <Col span={24}>
          <Form.Item
            label="信号参数："
            name="diagram-name"
            rules={[{ required: false, message: '' }]}
          >
            {/* 表单 */}
            <div className={styles.table_box}>
              <Table
                components={components}
                pagination={false}
                className={styles.table}
                columns={columns}
                dataSource={tableData}
                bordered
                footer={() => <a onClick={addItem}>✚添加数据</a>}
              />
            </div>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form.Item
            label="上传保养照片："
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
      <Row>
        <Col span={24}>
          <Form.Item
            label="保养总结及建议："
            name="TextArea"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input.TextArea
              maxLength={500}
              showCount
              placeholder="输入字数最多不超过500字"
              style={{ height: 200, resize: 'none' }}
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
      title: '保养人员',
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
