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
            label="组态看板名称："
            name="diagram-name"
            rules={[{ required: true, message: '请填写组态看板名称' }]}
          >
            <Input placeholder="请填写组态看板名称" />
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
            label="组态看板类型"
            name="diagram-name4"
            rules={[{ required: true, message: '请选择组态看板类型' }]}
          >
            <Select placeholder="请选择组态看板类型">
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            label="大屏URL"
            name="diagram-name5"
            // rules={[{ required: true, message: '请输入大屏URL' }]}
          >
            <Input placeholder="请输入大屏URL" />
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
