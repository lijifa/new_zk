interface Props {
  onClose: Function; // 关闭按钮回调方法
  onSubmit: Function; // 提交按钮回调方法
}
import ModalFooter from '@/components/ModalFooter';
import { Col, Form, Input, Row } from 'antd';

const Add = (props: Props) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    props.onSubmit();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{}}
      style={{ height: 700, overflowY: 'auto' }}
    >
      <Row justify={'space-around'}>
        <Col span={11}>
          <Form.Item
            label="材料名称："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input placeholder="支持数字，字母，汉字，特殊符号，1-13个字" />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item
            label="型号："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input placeholder="支持数字，字母，汉字，特殊符号，1-25个字" />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={'space-around'}>
        <Col span={11}>
          <Form.Item
            label="单位："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input placeholder="支持数字，字母，汉字，特殊符号，1-2个字" />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item
            label="品牌："
            name="diagram-name"
            rules={[{ required: false, message: '必填' }]}
          >
            <Input placeholder="支持数字，字母，汉字，特殊符号，1-6个字" />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={'space-around'}>
        <Col span={11}>
          <Form.Item
            label="售后厂家："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input placeholder="支持数字，字母，汉字，特殊符号，1-10个字" />
          </Form.Item>
        </Col>
        <Col span={11}></Col>
      </Row>
      <ModalFooter
        cancelFun={() => {
          props.onClose();
        }}
      />
    </Form>
  );
};

export default Add;
