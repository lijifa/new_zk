interface Props {
  onClose: Function; // 关闭按钮回调方法
  onSubmit: Function; // 提交按钮回调方法
}

import ModalFooter from '@/components/ModalFooter';
import { Col, Form, Row } from 'antd';
import React, { useState } from 'react';
import styles from './index.less';

const Add = (props: Props) => {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState<any>([]);

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    props.onSubmit();
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

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{}}
      style={{ height: 700, overflowY: 'auto' }}
    >
      <Row>
        <Col span={24}>
          <Form.Item
            label="选择系统"
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            {/* 按钮组 */}
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className={styles.text_box}>
            <span>
              1、请选择您所需要初始化保养规则的系统，可获取相关初始数据。
            </span>
            <span>2、已经初始化过的系统数据不可重复选择。</span>
          </div>
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
