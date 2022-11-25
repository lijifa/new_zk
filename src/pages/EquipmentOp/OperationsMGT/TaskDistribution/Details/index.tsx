import ZKTable from '@/components/ZKTable';
import { Col, Form, Row } from 'antd';
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
      title: '设备分类',
      dataIndex: 'age',
    },
    {
      title: '设备名称',
      dataIndex: 'address',
    },
    {
      title: '指标项',
      dataIndex: 'address',
    },
  ];

  const SecColumns = [
    {
      title: '参与人员',
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
  ];

  return (
    <>
      <Form form={form} layout="vertical" initialValues={{}}>
        <Row>
          <Col span={24} className={styles.time_box}>
            <div className={styles.labelConternItem}>
              <label>上次修改时间:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>下次任务时间:</label>
              <span className={styles.content}>--</span>
            </div>
          </Col>
        </Row>
        <Row justify={'space-between'}>
          <Col span={24} className={styles.table_box}>
            <div className={styles.labelContern}>
              <div className={styles.labelConternItem}>
                <label>任务派发名称:</label>
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
                <label>任务派发类型:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>派发开始时间:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>派发结束时间:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>派发方式:</label>
                <span className={styles.content}>--</span>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label="任务内容："
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
              label="参与人员："
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
      </Form>
    </>
  );
});

export default Details;
