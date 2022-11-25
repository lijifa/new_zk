import ZKTable from '@/components/ZKTable';
import { Col, Form, Image, Input, Row } from 'antd';
import React, { memo, useRef } from 'react';
import styles from './index.less';

const Details = memo(() => {
  const [form] = Form.useForm();
  const shareRef = useRef<any>();

  // 表格数据
  const FirstColumns = [
    {
      title: '序号',
      dataIndex: 'name',
      render: (_: any, record: any) => {
        console.log('record:', record);
        return record.key;
      },
    },
    {
      title: '设备名称',
      dataIndex: 'age',
    },
    {
      title: '设备分类',
      dataIndex: 'address',
    },
    {
      title: '指标项',
      dataIndex: 'address',
    },
    {
      title: '是否保养',
      dataIndex: 'address',
    },
  ];

  const SecColumns = [
    {
      title: '保养人员',
      dataIndex: 'name',
    },
    {
      title: '手机号码',
      dataIndex: 'age',
    },
    {
      title: '所属部门',
      dataIndex: 'address',
    },
    {
      title: '所属岗位',
      dataIndex: 'address',
    },
    {
      title: '是否到岗',
      dataIndex: 'address',
    },
  ];

  const ThreeColumns = [
    {
      title: '辅料名称',
      dataIndex: 'name',
    },
    {
      title: '规格型号',
      dataIndex: 'age',
    },
    {
      title: '数量',
      dataIndex: 'address',
    },
    {
      title: '单位',
      dataIndex: 'address',
    },
    {
      title: '品牌',
      dataIndex: 'address',
    },
    {
      title: '生产厂家',
      dataIndex: 'address',
    },
  ];

  return (
    <div style={{ height: 730, overflowY: 'auto' }}>
      <Form form={form} layout="vertical" initialValues={{}}>
        <Row>
          <Col span={24} className={styles.time_box}>
            <div className={styles.subTitle}>
              <span>企业营业执照</span>
            </div>
          </Col>
        </Row>
        <Row justify={'space-between'}>
          <Col span={24} className={styles.table_box}>
            <div className={styles.labelContern}>
              <div className={styles.labelConternItem}>
                <label>保养单号:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>保养名称:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>所属系统:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>所属站点:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>保养开始时间:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>保养结束时间:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>保养总时长:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>保养结果:</label>
                <span className={styles.content}>--</span>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24} className={styles.time_box}>
            <div className={styles.subTitle}>
              <span>保养信息</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label="保养内容："
              name="diagram-name"
              rules={[{ required: false }]}
            >
              <div className={'zkTableContent'} style={{ padding: 0 }}>
                <ZKTable
                  btnList={[]}
                  searchForm={form}
                  tableColumns={FirstColumns}
                  clickOperBtn={(t: string, d: any) => {}}
                  ref={shareRef}
                  isRowCheck={false}
                />
              </div>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label="保养人员："
              name="diagram-name"
              rules={[{ required: false }]}
            >
              <div className={'zkTableContent'} style={{ padding: 0 }}>
                <ZKTable
                  btnList={[]}
                  searchForm={form}
                  tableColumns={SecColumns}
                  clickOperBtn={(t: string, d: any) => {}}
                  ref={shareRef}
                  isRowCheck={false}
                />
              </div>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label="使用辅料："
              name="diagram-name"
              rules={[{ required: false }]}
            >
              <div className={'zkTableContent'} style={{ padding: 0 }}>
                <ZKTable
                  btnList={[]}
                  searchForm={form}
                  tableColumns={ThreeColumns}
                  clickOperBtn={(t: string, d: any) => {}}
                  ref={shareRef}
                  isRowCheck={false}
                />
              </div>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Item
              label="保养照片："
              name="diagram-name"
              rules={[{ required: false }]}
            >
              <Image
                width={120}
                src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label="保养总结及建议："
              name="diagram-name"
              rules={[{ required: false }]}
            >
              <Input.TextArea style={{ height: 200, resize: 'none' }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
});

export default Details;
