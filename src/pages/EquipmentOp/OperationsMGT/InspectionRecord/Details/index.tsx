import ZKTable from '@/components/ZKTable';
import { Col, Form, Image, Row } from 'antd';
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
      title: '结果',
      dataIndex: 'address',
    },
  ];

  const SecColumns = [
    {
      title: '巡检人员',
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

  return (
    <div style={{ height: 730, overflowY: 'auto' }}>
      <Form form={form} layout="vertical" initialValues={{}}>
        <Row>
          <Col span={24} className={styles.time_box}>
            <div className={styles.subTitle}>
              <span>基本信息</span>
            </div>
          </Col>
        </Row>
        <Row justify={'space-between'}>
          <Col span={24} className={styles.table_box}>
            <div className={styles.labelContern}>
              <div className={styles.labelConternItem}>
                <label>巡检单号:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>巡检名称:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>巡检时间:</label>
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
                <label>巡检结果:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>巡检方式:</label>
                <span className={styles.content}>--</span>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24} className={styles.time_box}>
            <div className={styles.subTitle}>
              <span>巡检信息</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label="巡检内容："
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
              label="人员信息："
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
          <Col>
            <Form.Item
              label="巡检照片："
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
      </Form>
    </div>
  );
});

export default Details;
