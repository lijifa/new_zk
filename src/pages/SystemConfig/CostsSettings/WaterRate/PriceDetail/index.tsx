interface Props {
  onClose: Function; // 关闭按钮回调方法
  onSubmit: Function; // 提交按钮回调方法
}
import ModalFooter from '@/components/ModalFooter';
import ZKTable from '@/components/ZKTable';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Form, Input, Row, Select } from 'antd';
import { useState } from 'react';
import styles from './index.less';

const { Option } = Select;
const { TextArea } = Input;

const PriceDetail = (props: Props) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    props.onSubmit();
  };
  const uploadButton = (
    <div>{loading ? <LoadingOutlined /> : <PlusOutlined />}</div>
  );
  const columns = [
    {
      title: '设备名称',
      dataIndex: 'reason',
      align: 'left',
    },
    {
      title: '信号编号',
      dataIndex: 'systemName',
    },
    {
      title: '信号类型',
      dataIndex: 'siteName',
    },
    {
      title: '信号名称',
      dataIndex: 'siteProject',
    },
  ];
  const columsW = [
    {
        title: '所处时段',
        dataIndex: 'reason',
        align: 'left',
      },
      {
        title: '解段开始时间',
        dataIndex: 'systemName',
      },
      {
        title: '解段结束时间',
        dataIndex: 'siteName',
      },
      {
        title: '阶段单价',
        dataIndex: 'siteProject',
      },
      {
        title: '所处时段',
        dataIndex: 'siteProject',
      },

  ]

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{}}>
      <Row justify={'space-between'}>
        <Col span={24} className={styles.table_box}>
          <div className={styles.labelContern}>
            <div className={styles.labelConternItem}>
              <label>所属项目:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>所属站点:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>缴费单位:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>用水类型:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>费用单位:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label></label>
              <span className={styles.content}></span>
            </div>
          </div>
        </Col>
      </Row>
     
 

      <ModalFooter
        cancelFun={() => {
          props.onClose();
        }}
      />
      {/* <Form.Item>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item> */}
    </Form>
  );
};

export default PriceDetail;
