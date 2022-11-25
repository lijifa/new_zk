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
import {
  InfoCircleOutlined,
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import type { UploadProps } from 'antd';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputRef,
  message,
  Popconfirm,
  Row,
  Select,
  Table,
  Upload,
} from 'antd';
import type { FormInstance } from 'antd/es/form';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile } from 'antd/es/upload/interface';
import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './index.less';

const EditableContext = React.createContext<FormInstance<any> | null>(null);

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

const Add = (props: Props) => {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState<any>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    props.onSubmit();
  };

  // 点击删除事件
  const handleDelete = (key: React.Key) => {
    const newData = tableData.filter((item: any) => item.key !== key);
    setTableData(newData);
  };

  // 表格头部数据
  const defaultColumns: any = [
    {
      title: '规格类型',
      dataIndex: 'page_display',
      width: 300,
    },
    {
      title: '规格参数',
      dataIndex: 'signal_value',
      width: 800,
      editable: true,
    },
    {
      title: '操作',
      dataIndex: 'address',
      align: 'center',
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

  // 添加数据事件
  const addItem = () => {
    const newTableData = {
      key: count,
      signal_value: '',
      page_display: (
        <Select
          placeholder="规格类型"
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

  const columns = defaultColumns.map((col: any) => {
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

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const items: UploadProps = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
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
            label="设备名称"
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input placeholder="支持数字，字母，汉字，特殊符号，2-20个字" />
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
            {' '}
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
            label="设备种类："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Select
              placeholder="请选择设备种类"
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
          <Form.Item
            label="一级分类："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Select
              placeholder="请选择一级分类"
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
            请先选择系统和一级分类
          </span>
          <Form.Item
            label="二级分类："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Select
              placeholder="请选择二级分类"
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
            label="设备型号："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input placeholder="支持数字，字母，汉字，特殊符号，1-30个字" />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            label="所属品牌："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input placeholder="支持数字，字母，汉字，特殊符号，1-15个字" />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            label="启用日期："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <DatePicker
              placeholder="请选择启用日期"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={'space-between'}>
        <Col span={7}>
          <Form.Item
            label="安装位置："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input placeholder="50字以内" />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            label="质保市场（月）："
            name="diagram-name"
            rules={[{ required: false, message: '必填' }]}
          >
            <Input placeholder="支持数字0-9" />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            label="售后厂商："
            name="diagram-name"
            rules={[{ required: false, message: '必填' }]}
          >
            <Input placeholder="支持数字，字母，汉字，特殊符号，1-30个字" />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={'space-between'}>
        <Col span={7}>
          <Form.Item
            label="出厂编号："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input placeholder="支持数字，字母，汉字，特殊符号，1-30个字" />
          </Form.Item>
        </Col>
        <Col span={7}>
          <Form.Item
            label="保养周期（h）："
            name="diagram-name"
            rules={[{ required: false, message: '必填' }]}
          >
            <Input placeholder="支持数字0-9" />
          </Form.Item>
        </Col>
        <Col span={7} style={{ visibility: 'hidden' }}>
          <Form.Item
            label="售后厂商："
            name="diagram-name"
            rules={[{ required: false, message: '必填' }]}
          >
            <Input placeholder="支持数字，字母，汉字，特殊符号，1-30个字" />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Form.Item
            label="设备规格："
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

      <Row style={{ marginBottom: 20 }}>
        <Col span={24}>
          <span className={styles.warn_text} style={{ color: 'red' }}>
            注：文档格式大小不超4MB（最多5个），支持.doc .docx .pdf .xsl
            .xlsx类型（例：设备使用手册）
          </span>
          <Form.Item
            label="设备文档："
            name="FormeItem"
            rules={[{ required: false, message: '' }]}
          >
            <Upload {...items}>
              <Button icon={<UploadOutlined />}>上传文档</Button>
            </Upload>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <span className={styles.warn_text} style={{ color: 'red' }}>
            注：图片格式大小范围100KB-5MB（最多5个）,支持.jpg与.png格式
          </span>
          <Form.Item
            label="设备图片："
            name="FormeItem"
            rules={[{ required: false, message: '' }]}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
    </Form>
  );
};

export default Add;
