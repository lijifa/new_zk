import { Col, Form, Input, Row } from 'antd';
import { memo, useRef } from 'react';
import styles from './index.less';

const Details = memo(() => {
  const [form] = Form.useForm();
  const shareRef = useRef<any>();

  // 表格数据
  const FirstColumns = [
    {
      title: '规格类型',
      dataIndex: 'name',
    },
    {
      title: '规格参数',
      dataIndex: 'age',
    },
  ];

  const SecColumns = [
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
        <Row justify={'space-between'}>
          <Col span={24} className={styles.table_box}>
            <div className={styles.labelContern}>
              <div className={styles.labelConternItem}>
                <label>所属系统:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>一级分类:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>二级分类:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>设备规格名称:</label>
                <span className={styles.content}>--</span>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <span>备注：</span>
          <Col span={24}>
            <Input.TextArea
              maxLength={500}
              style={{ height: 200, resize: 'none' }}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
});

export default Details;
