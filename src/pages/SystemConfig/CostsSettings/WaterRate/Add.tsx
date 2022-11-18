interface Props {
  onClose: Function; // 关闭按钮回调方法
  onSubmit: Function; // 提交按钮回调方法
}
import ModalFooter from '@/components/ModalFooter';
import { Col, Form, Input, Row, Select } from 'antd';

const { Option } = Select;

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
            label="所属项目:"
            name="diagram-name"
            rules={[{ required: true, message: '请选择项目' }]}
          >
            <Select placeholder="请选择所属项目">
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={11}>
          <Form.Item
            label="所属站点："
            name="diagram-name2"
            rules={[{ required: true, message: '请选择所属站点' }]}
          >
            <Select placeholder="请选择所属站点">
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
            label="缴费单位："
            name="diagram-name3"
            rules={[{ required: true, message: '请输入缴费单位' }]}
          >
            <Input placeholder="请输入缴费单位" />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item
            label="用水类型"
            name="diagram-name4"
            rules={[{ required: true, message: '请输入用水类型' }]}
          >
            <Select placeholder="请选择用水类型">
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
            label="费用单价(元/m³):"
            name="diagram-name5"
            rules={[{ required: true, message: '请输入费用单价' }]}
          >
            <Input placeholder="请输入费用单价" />
          </Form.Item>
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
