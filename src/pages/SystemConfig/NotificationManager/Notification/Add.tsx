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
            label="站点名称:"
            name="diagram-name"
            rules={[{ required: true, message: '请填写组态看板名称' }]}
          >
            <Input placeholder="请输入站点名称" />
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

        <Col span={11}>
          <Form.Item
            label="站点所在地"
            name="diagram-name3"
            rules={[{ required: true, message: '请选择所属系统' }]}
          >
            <Select placeholder="请选择所在地">
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
            label="所属区域："
            name="diagram-name4"
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
            name="diagram-name5"
            rules={[{ required: true, message: '请选择组态看板类型' }]}
          >
            <Select placeholder="--请选择--">
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item
            label="组态看板类型"
            name="diagram-name6"
            rules={[{ required: true, message: '请选择组态看板类型' }]}
          >
            <Select placeholder="--请选择--">
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
            label="供冷面积(万m)："
            name="diagram-name7"
            rules={[{ required: true, message: '请选择所属站点' }]}
          >
              <Input placeholder="请输入供冷面积" />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item
            label="供冷季开始日期"
            name="diagram-name8"
            rules={[{ required: true, message: '请选择组态看板类型' }]}
          >
            <Select placeholder="--请选择--">
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item
            label="供冷季结束日期"
            name="diagram-name9"
            rules={[{ required: true, message: '请选择组态看板类型' }]}
          >
            <Select placeholder="--请选择--">
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
            label="供热面积"
            name="diagram-name10"
            rules={[{ required: true, message: '请选择所属站点' }]}
          >
           <Input placeholder="请输入供热面积" />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item
            label="供热开始日期"
            name="diagram-name11"
            rules={[{ required: true, message: '请选择组态看板类型' }]}
          >
            <Select placeholder="--请选择--">
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item
            label="供冷开始日期"
            name="diagram-name12"
            rules={[{ required: true, message: '请选择组态看板类型' }]}
          >
            <Select placeholder="--请选择--">
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
            label="负责人"
            name="diagram-name13"
            rules={[{ required: true, message: '请选择所属站点' }]}
          >
           <Input placeholder="请输入负责人姓名" />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item
            label="联系电话"
            name="diagram-name14"
            rules={[{ required: true, message: '请选择组态看板类型' }]}
          >
             <Input placeholder="请输入负责人联系电话" />
          </Form.Item>
        </Col>
        <Col span={11}>
          <Form.Item
            label="消防设备"
            name="diagram-name15"
            rules={[{ required: true, message: '请选择组态看板类型' }]}
          >
            <Select placeholder="--请选择--">
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row justify={'space-between'}>
        <Col span={24}>
          <Form.Item
            label="备注"
            name="diagram-name13"
            rules={[{ required: true, message: '请选择所属站点' }]}
          >
           <Input placeholder="请输入负责人姓名" />
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
