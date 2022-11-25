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
      title: '保养单号',
      dataIndex: 'name',
    },
    {
      title: '保养名称',
      dataIndex: 'age',
    },
    {
      title: '派发时间',
      dataIndex: 'address',
    },
    {
      title: '保养设备',
      dataIndex: 'address',
    },
    {
      title: '所属站点',
      dataIndex: 'address',
    },
    {
      title: '所属系统',
      dataIndex: 'address',
    },
    {
      title: '主保养人',
      dataIndex: 'address',
    },
    {
      title: '提交时间',
      dataIndex: 'address',
    },
    {
      title: '任务状态',
      dataIndex: 'address',
    },
  ];

  return (
    <>
      <Form form={form} layout="vertical" initialValues={{}}>
        <Row>
          <Col span={24}>
            <div className={styles.title_box}>
              <div className={styles.content}>
                <div className={styles.first_box}>
                  <div>保养单总数</div>
                  <div className={styles.number}>1</div>
                </div>
                <div className={styles.sec_box}>
                  <div>
                    <span>已派发数量</span>
                    <span
                      style={{ color: '#268cff' }}
                      className={styles.number}
                    >
                      1
                    </span>
                  </div>
                  <div>
                    <span>未派发数量</span>
                    <span className={styles.number}>1</span>
                  </div>
                </div>
                <div className={styles.three_box}>
                  <div>
                    <span>已保养次数</span>
                    <span
                      style={{ color: '#268cff' }}
                      className={styles.number}
                    >
                      1
                    </span>
                  </div>
                  <div>
                    <span>未保养次数</span>
                    <span className={styles.number}>1</span>
                  </div>
                </div>
              </div>
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
    </>
  );
});

export default Details;
