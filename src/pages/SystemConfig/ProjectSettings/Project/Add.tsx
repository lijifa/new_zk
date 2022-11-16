interface Props {
  onClose: Function; // 关闭按钮回调方法
  onSubmit: Function; // 提交按钮回调方法
}
import ModalFooter from '@/components/ModalFooter';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Col, Form, Input, Row, Select, Upload } from 'antd';
import { useState } from 'react';

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
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{}}
      >
        <Row justify={'space-between'}>
          <Col span={7}>
            <Form.Item
              label="项目名称:"
              name="diagram-name"
              rules={[
                {
                  required: true,
                  message: '支持数字,字母,汉字,特殊符号,2-10字',
                },
              ]}
            >
              <Input placeholder="支持数字,字母,汉字,特殊符号,2-10字" />
            </Form.Item>
          </Col>

          <Col span={7}>
            <Form.Item
              label="项目类型:"
              name="diagram-name2"
              rules={[{ required: true, message: '请选择项目类型' }]}
            >
              <Select placeholder="请选择项目类型">
                <Option value="red">Red</Option>
                <Option value="green">Green</Option>
                <Option value="blue">Blue</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={7}>
            <Form.Item
              label="项目总金额(元):"
              name="diagram-name3"
              rules={[{ required: true, message: '请选择所属系统' }]}
            >
              <Input placeholder="请选择所属系统" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={'space-between'}>
          <Col span={7}>
            <Form.Item
              label="项目总面积(万㎡):"
              name="diagram-name4"
              rules={[{ required: true, message: '请输入项目总面积' }]}
            >
              <Input placeholder="请输入项目总面积" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="供冷/供热面积(万㎡):"
              name="diagram-name5"
              rules={[{ required: true, message: '请输入供冷/供热面积' }]}
            >
              <Input placeholder="请输入供冷/供热面积" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="项目所在地:"
              name="diagram-name6"
              rules={[{ required: true, message: '请输入项目所在地' }]}
            >
              <Input placeholder="请输入项目所在地" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={'space-between'}>
          <Col span={7}>
            <Form.Item
              label="联系人姓名:"
              name="diagram-name7"
              rules={[{ required: true, message: '请输入项目联系人' }]}
            >
              <Input placeholder="请输入项目联系人" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="联系人电话:"
              name="diagram-name8"
              rules={[{ required: true, message: '请输入11位联系人电话' }]}
            >
              <Input placeholder="请输入11位联系人电话" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="用能人数:"
              name="diagram-name9"
              rules={[{ required: true, message: '请输入用能人数' }]}
            >
              <Input placeholder="请输入用能人数" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={'space-between'}>
          <Col span={24}>
            <Form.Item
              label="项目简介:"
              name="diagram-name10"
              rules={[{ required: true, message: '请输入负责人姓名' }]}
            >
              <TextArea
                showCount
                maxLength={500}
                style={{ height: 200, resize: 'none' }}
                //onChange={onChange}
                placeholder="输入字数最多不超过500字"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={'space-between'}>
          <Col span={24}>
            <Form.Item
              label="项目照片:"
              name="diagram-name11"
              rules={[{ required: true, message: '请输入负责人姓名' }]}
            >
              <span
                style={{
                  color: 'rgba(241, 97, 103, 1)',
                  fontSize: '12px',
                  position: 'relative',
                  top: '-30px',
                  left: '107px',
                }}
              >
                注：建议上传尺寸大小为920×680像素的图片，图片格式大小范围100KB-5MB,支持.jpg与.png格式
              </span>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                // beforeUpload={beforeUpload}
                //onChange={handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: '100%' }} />
                ) : (
                  uploadButton
                )}
              </Upload>
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
