interface Props {
  onClose: Function; // 关闭按钮回调方法
  onSubmit: Function; // 提交按钮回调方法
}
import ModalFooter from '@/components/ModalFooter';
import { Col, DatePicker, Form, Input, Row, Select } from 'antd';
import styles from './Add.less'

const { Option } = Select;
const { RangePicker } = DatePicker;

const Add = (props: Props) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    props.onSubmit();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{}}>
      <Row justify={'space-between'}>
        <Col span={11}>
          <Form.Item
            label="告警规则名称:"
            name="diagram-name"
            rules={[{ required: true, message: '请输入告警规则名称' }]}
          >
            <Input placeholder="请输入告警规则名称" />
          </Form.Item>
        </Col>

        <Col span={11}>
          <Form.Item
            label="所属系统："
            name="diagram-name2"
            rules={[{ required: true, message: '请选择所属系统' }]}
          >
            <Select placeholder="请选择所属系统">
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row justify={'space-between'}>
        <Col span={11}>
          <Form.Item
            label="所属站点："
            name="diagram-name3"
            rules={[{ required: true, message: '请选择所属站点' }]}
          >
            <Select placeholder="请选择所属站点">
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item
            label="告警规则"
            name="diagram-name4"
            rules={[{ required: true, message: '请选择告警规则' }]}
          >
            <Select placeholder="请选择告警规则">
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row justify={'space-between'}>
        <Col span={11}>
          <Form.Item
            label="时间范围:"
            name="diagram-name5"
            rules={[{ required: true, message: '请输入费用单价' }]}
          >
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={'space-between'}>
        <Col span={24} style={{marginTop:'40px'}}>
          <div  className={styles.conent}>
          <Form.Item
            label="告警规则:"
            name="diagram-name5"
            rules={[{ required: true, message: '请输入费用单价' }]}
          >
            <div style={{display:'flex'}}>
            <div> 请按要求完成告警规则名称，所属系统，所属站点，告警规则类型,的填写后前往设置告警规则。</div>
            <div className={styles.conentItem}>
              <ul>
                <li style={{color: '#F26268'}}>
                  <img src={require('./img/earlyalerm.png')}/>
                  未设置</li>
                <li>|</li>
                <li className={styles.change}>前往设置</li>
              </ul>
            </div>
            </div>
          </Form.Item>
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
