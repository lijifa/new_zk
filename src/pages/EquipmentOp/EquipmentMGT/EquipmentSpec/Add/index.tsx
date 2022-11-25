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
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useBoolean } from 'ahooks';
import type { InputRef } from 'antd';
import { Col, Form, Input, message, Popconfirm, Row, Select } from 'antd';
import type { FormInstance } from 'antd/es/form';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import React, { useContext, useEffect, useRef, useState } from 'react';

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

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    props.onSubmit();
  };

  // 表格头部数据
  const SecondColumns: any = [
    {
      title: '维修人员',
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

  // 点击删除事件
  const handleDelete = (key: React.Key) => {
    const newData = tableData.filter((item: any) => item.key !== key);
    setTableData(newData);
  };

  // 表格头部数据
  const defaultColumns: any = [
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
      editable: true,
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

  // 添加数据事件
  const addItem = () => {
    const newTableData = {
      key: count,
      signal_value: '',
      page_display: '',
      signal_status: (
        <Select
          placeholder="选择业务值类型"
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

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{}}
      style={{ height: 700, overflowY: 'auto' }}
    >
      <Row justify={'space-between'}>
        <Col span={11}>
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
        <Col span={11}>
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
      </Row>
      <Row justify={'space-between'}>
        <Col span={11}>
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
        <Col span={11}>
          <Form.Item
            label="设备规格名称："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input placeholder="请输入设备规格名称" />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={'space-between'}>
        <Col span={24}>
          <Form.Item
            label="备注："
            name="diagram-name"
            rules={[{ required: false, message: '必填' }]}
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
    </Form>
  );
};

export default Add;
