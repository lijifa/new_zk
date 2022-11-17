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
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{}}>
      <Row justify={'space-between'}>
        <Col span={11}>
          <Form.Item
            label="角色名称："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item
            label="权限字符："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={'space-between'}>
        <Col span={11}>
          <Form.Item
            label="显示顺序："
            name="diagram-name"
            rules={[{ required: true, message: '必填' }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item label="菜单权限：" name="diagram-name4">
            {/* 树状图权限 */}
          </Form.Item>
        </Col>
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
