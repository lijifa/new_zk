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
            label="所属部门："
            name="diagram-name"
            rules={[{ required: true, message: '请选择所属部门' }]}
          >
            <Input placeholder="请选择所属部门" />
          </Form.Item>
        </Col>

        <Col span={11}>
          <Form.Item
            label="部门名称："
            name="diagram-name2"
            rules={[{ required: true, message: '请输入部门名称' }]}
          >
            <Input placeholder="支持汉字，数字，字母，特殊符号，2-20个字" />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={'space-between'}>
        <Col span={11}>
          <Form.Item
            label="显示顺序："
            name="diagram-name3"
            rules={[{ required: true, message: '请输入数字以便排序' }]}
          >
            <Input placeholder="请输入数字以便排序" />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item
            label="联系人姓名"
            name="diagram-name4"
            rules={[
              { required: false, message: '请填写汉字或字母,至少输入2个字' },
            ]}
          >
            <Input placeholder="请填写汉字或字母,至少输入2个字" />
          </Form.Item>
        </Col>
      </Row>
      <Row justify={'space-between'}>
        <Col span={11}>
          <Form.Item
            label="联系人电话"
            name="diagram-name4"
            rules={[{ required: false, message: '请输入11位手机号' }]}
          >
            <Input placeholder="请输入11位手机号" />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item
            label="邮箱"
            name="diagram-name4"
            rules={[{ required: false, message: '请输入邮箱' }]}
          >
            <Input placeholder="请输入邮箱" />
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
