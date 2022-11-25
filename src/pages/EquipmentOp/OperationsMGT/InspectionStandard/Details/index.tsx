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
      width: 100,
      render: (_: any, record: any) => {
        console.log('record:', record);
        return record.key;
      },
    },
    {
      title: '指标项',
      dataIndex: 'age',
    },
  ];

  return (
    <div style={{ height: 730, overflowY: 'auto' }}>
      <Form form={form} layout="vertical" initialValues={{}}>
        <Row justify={'space-between'}>
          <Col span={24} className={styles.table_box}>
            <div className={styles.labelContern}>
              <div className={styles.labelConternItem}>
                <label>巡检标准编号:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>巡检标准名称:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>所属系统:</label>
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
              <span>指标信息（合计0）</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
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
          </Col>
        </Row>
      </Form>
    </div>
  );
});

export default Details;
