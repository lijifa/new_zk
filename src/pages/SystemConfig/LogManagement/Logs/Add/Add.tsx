interface Props {
  onClose: Function; // 关闭按钮回调方法
  onSubmit: Function; // 提交按钮回调方法
}
import ModalFooter from '@/components/ModalFooter';
import { Col, Form, Row, Select } from 'antd';
import styles from './Add.less'

const { Option } = Select;

const Add = (props: Props) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    props.onSubmit();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{}}>
      <Row justify={'space-between'} style={{marginBottom:'20px'}}>
        <Col span={24}>
          <div>
            <span className={styles.text}>操作模块：</span>任务计划
          </div>
        </Col>
      </Row>
      <Row justify={'space-between'} style={{marginBottom:'30px'}}>
        <Col span={24}>
          <div>
            <span className={styles.text}>请求地址：</span>
            //business/mfrs_task_plan_tp/add
          </div>
        </Col>
      </Row>
      <Row justify={'space-between'} style={{marginBottom:'30px'}}>
        <Col span={24}>
          <div>
            <span style={{marginRight:'3px'}}>登录信息：</span> hdzk / null / 192.168.1.126 / 内网IP
          </div>
        </Col>
      </Row>
      <Row justify={'space-between'} style={{marginBottom:'20px'}}>
        <Col span={24}>
          <div>
            <span style={{marginRight:'20px'}} >操作方法:</span>
            com.uustop.project.business.mfrstaskplantp.controller.MfrsTaskPlanTpController.addSave()
          </div>
        </Col>
      </Row>
      <Row justify={'space-between'} style={{marginBottom:'20px'}}>
        <Col span={24}>
          <div className={styles.table}>
            <span >请求参数：</span>
            <div className={styles.tablec}></div>
          </div>
        </Col>
      </Row>
      <Row justify={'space-between'} >
        <Col span={24}>
          <div style={{display:'flex'}} >
            <div style={{marginLeft:'28px'}}>状态:</div>
            <div className={styles.status}>正常</div>
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

export default Add;
