interface Props {
  onClose: Function; // 关闭按钮回调方法
  onSubmit: Function; // 提交按钮回调方法
  //Type: string; // 传入的类型
}
import ModalFooter from '@/components/ModalFooter';
import { Form,Row,Col} from 'antd';
import styles from './Detail.less'

const onChange = (value: string[]) => {
  console.log(value);
};

const Detailpage = (props: Props) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    props.onSubmit();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{}}>
      <Row justify={'space-between'}>
        <Col span={24} className={styles.table_box}>
          <div className={styles.labelContern}>
            <div className={styles.labelConternItem}>
              <label>站点名称:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>暖通系统:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>供冷面积:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>供热面积:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>供冷季开始日期:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>供冷季结束日期:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>供热季开始日期:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>供热季结束日期:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>所属地区:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>站点所在地:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>负责人:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>联系电话:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>消防设施:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <span className={styles.content}></span>
            </div>
            <div className={styles.labelConternItem} style={{width:'100%'}}>
              <label>备注:</label>
              <span className={styles.content}>--</span>
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

export default Detailpage;
