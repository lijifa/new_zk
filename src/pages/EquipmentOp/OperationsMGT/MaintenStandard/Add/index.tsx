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
import { InfoCircleOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Col, Form, Input, Popconfirm, Row, Select, Table } from 'antd';
import type { FormInstance } from 'antd/es/form';
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
      title: '序号',
      dataIndex: 'signal_value',
      align: 'center',
      width: 300,
      render: (_: any, record: any) => {
        return record.key + 1;
      },
    },
    {
      title: '指标项',
      dataIndex: 'page_display',
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
      page_display: '',
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
        <Col span={7}>
          <Form.Item
            label="保养标准名称："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input placeholder="请输入保养标准名称，最多20个字" />
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
          <Form.Item
            label="设备一级分类："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Select
              placeholder="请选择设备一级分类"
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
        <span className={styles.warn_text}>
          <InfoCircleOutlined style={{ marginRight: 5 }} />
          请先选择系统和设备一级分类
        </span>
        <Col span={7}>
          <Form.Item
            label="设备二级分类："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Select
              placeholder="请选择设备二级分类"
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
      <Row>
        <Col span={24}>
          <Form.Item
            label="指标信息："
            name="diagram-name"
            rules={[{ required: true, message: '' }]}
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
      <ModalFooter
        cancelFun={() => {
          props.onClose();
        }}
      />
    </Form>
  );
};

export default Add;
