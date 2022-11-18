interface Props {
  onClose: Function; // 关闭按钮回调方法
  onSubmit: Function; // 提交按钮回调方法
}
import ModalFooter from '@/components/ModalFooter';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Radio, Row, Select } from 'antd';
import { useState } from 'react';
import NewTable from './NewTable'

const { Option } = Select;
const { TextArea } = Input;

const Add = (props: Props) => {
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

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{}}>
      <Row justify={'space-between'}>
        <Col span={7}>
          <Form.Item
            label="所属项目:"
            name="diagram-name"
            rules={[
              {
                required: true,
                message: '请选择所属项目',
              },
            ]}
          >
            <Select placeholder="请选择所属项目">
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={7}>
          <Form.Item
            label="所属站点:"
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

        <Col span={7}>
          <Form.Item
            label="缴费单位:"
            name="diagram-name3"
            rules={[{ required: true, message: '请输入缴费单位' }]}
          >
            <Input placeholder="请输入缴费单位" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={7}>
          <Form.Item
            label="用电类型:"
            name="diagram-name4"
            rules={[{ required: true, message: '请选择用电类型' }]}
          >
            <Select placeholder="请选择用电类型">
              <Option value="red">Red</Option>
              <Option value="green">Green</Option>
              <Option value="blue">Blue</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={7} style={{ marginLeft: '80px' }}>
          <Form.Item
            label="电压等级:"
            name="diagram-name5"
            rules={[{ required: true, message: '请选择电压等级' }]}
          >
            <Select placeholder="请选择电压等级">
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
            label="是否有电蓄热采暖或者电蓄冰制冷:"
            name="diagram-name6"
            rules={[{ required: true, message: '' }]}
          >
            <Radio.Group>
              <Radio value={1}>是</Radio>
              <Radio value={2}>否</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>
      <Row justify={'space-between'}>
        <Col span={24}>
          <Form.Item
            label="绑定设备:"
            name="diagram-name7"
            rules={[{ required: true, message: '请绑定设备' }]}
          >
            <Col span={24}>
              <NewTable/>
            </Col>
          </Form.Item>
        </Col>
      </Row>
      <Row justify={'space-between'}>
        <Col span={24}>
          <Form.Item
            label="不同阶段的费用单价 (元/kW·h):"
            name="diagram-name7"
            rules={[{ required: true, message: '请添加数据' }]}
          >
            <Col span={24}></Col>
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
