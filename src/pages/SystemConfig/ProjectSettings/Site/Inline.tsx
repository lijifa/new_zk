interface Props {
    onClose: Function; // 关闭按钮回调方法
    onSubmit: Function; // 提交按钮回调方法
  }
  import ModalFooter from '@/components/ModalFooter';
  import {
    Cascader,
    Col,
    DatePicker,
    Form,
    Input,
    Radio,
    Row,
    Select,
  } from 'antd';
  
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const { TextArea } = Input;
  const options = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];
  
  const onChange = (value: string[]) => {
    console.log(value);
  };
  
  const Inline = (props: Props) => {
    const [form] = Form.useForm();
  
    const onFinish = (values: any) => {
      console.log('Received values of form: ', values);
      props.onSubmit();
    };
  
    return (
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{}}>
        <Row justify={'space-between'}>
          <Col span={7}>
            <Form.Item
              label="站点名称:"
              name="diagram-name"
              rules={[{ required: true, message: '请输入站点名称' }]}
            >
              <Input placeholder="请输入站点名称" />
            </Form.Item>
          </Col>
  
          <Col span={7}>
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
  
          <Col span={7}>
            <Form.Item
              label="站点所在地"
              name="diagram-name3"
              rules={[{ required: true, message: '请选择站点所在地' }]}
            >
              <Cascader
                options={options}
               // onChange={onChange}
                placeholder="请选择站点所在地"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={'space-between'}>
          <Col span={24}>
            <Form.Item
              label="站点详细地址"
              name="diagram-name4"
              rules={[{ required: true, message: '请输入站点详细地址' }]}
            >
              <Input placeholder="请输入站点详细地址" />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={'space-between'}>
          <Col span={7}>
            <Form.Item
              label="供冷面积(万㎡)："
              name="diagram-name7"
              rules={[{ required: true, message: '请输入供冷面积' }]}
            >
              <Input placeholder="请输入供冷面积" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="供冷季开始日期"
              name="diagram-name8"
              rules={[{ required: true, message: '请选择供冷季开始日期' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                showTime
                placeholder="请选择供冷季开始日期"
              />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="供冷季结束日期"
              name="diagram-name9"
              rules={[{ required: true, message: '请选择供冷季结束日期' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                showTime
                placeholder="请选择供冷季结束日期"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={'space-between'}>
          <Col span={7}>
            <Form.Item
              label="供热面积(万㎡)："
              name="diagram-name10"
              rules={[{ required: true, message: '请输入供热面积' }]}
            >
              <Input placeholder="请输入供热面积" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="供热开始日期"
              name="diagram-name11"
              rules={[{ required: true, message: '请选择供热开始日期' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                showTime
                placeholder="请选择供热开始日期"
              />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="供热结束日期"
              name="diagram-name12"
              rules={[{ required: true, message: '请选择供热结束日期' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                showTime
                placeholder="请选择供热季结束日期"
              />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={'space-between'}>
          <Col span={7}>
            <Form.Item
              label="负责人"
              name="diagram-name13"
              rules={[{ required: true, message: '请输入负责人姓名' }]}
            >
              <Input placeholder="请输入负责人姓名" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="联系电话"
              name="diagram-name14"
              rules={[{ required: true, message: '请输入负责人联系电话' }]}
            >
              <Input placeholder="请输入负责人联系电话" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="消防设备"
              name="diagram-name15"
              rules={[{ required: true, message: '请选择组态看板类型' }]}
            >
              <Radio.Group defaultValue="a">
                <Radio value="a"> 健全</Radio>
  
                <Radio value="b"> 缺失</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row justify={'space-between'}>
          <Col span={24}>
            <Form.Item
              label="备注"
              name="diagram-name16"
              rules={[{ required: true, message: '请输入备注' }]}
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
  
  export default Inline;
  