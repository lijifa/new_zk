interface Props {
  onClose: Function; // 关闭按钮回调方法
  onSubmit: Function; // 提交按钮回调方法
  type: string; // 传来的类型
  id: number; //
}
import ModalFooter from '@/components/ModalFooter';
import {
  getAddSite,
  getAmendSite,
  getChangeSite,
} from '@/services/SystemConfig/ProjectSetting/site';
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
import moment from 'moment';
import { useEffect, useState } from 'react';

const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const options = [
  {
    value: 1,
    label: '北京',
    children: [
      {
        value: 2,
        label: '东城',
        children: [
          {
            value: 3,
            label: '什刹海',
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

const Add = (props: Props) => {
  const { type, id } = props;
  const [List, setlist] = useState<any>();
  useEffect(() => {
    if (type === 'add') {
      setlist(undefined);
    } else {
      getChangeSite({ id }).then((res) => {
        let result = res.data;
        setlist(result);
      });
    }
  }, []);
  //处理修改查看时间数据
  let newcoolingBeginTime = moment(List && List.coolingBeginTime);
  let newcoolingEndTime = moment(List && List.coolingEndTime);
  let newheatingBeginTime = moment(List && List.heatingBeginTime);
  let newheatingEndTime = moment(List && List.heatingEndTime);
  const [form] = Form.useForm();
  //提交方法
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    //date-time-picker': fieldsValue['date-time-picker'].format('YYYY-MM-DD HH:mm:ss')
    let {
      name,
      adress,
      coolingArea,
      heatingArea,
      isHealthy,
      leader,
      phoneNumber,
      remarks,
      siteAddress,
      systemId,
      coolingBeginTime,
      coolingEndTime,
      heatingBeginTime,
      heatingEndTime,
    } = values;
    let NheatingEndTime = heatingEndTime.format('YYYY-MM-DD HH:mm:ss');
    let NheatingBeginTime = heatingBeginTime.format('YYYY-MM-DD HH:mm:ss');
    let NcoolingEndTime = coolingEndTime.format('YYYY-MM-DD HH:mm:ss');
    let NcoolingBeginTime = coolingBeginTime.format('YYYY-MM-DD HH:mm:ss');
    let provinceId = siteAddress[0];
    let cityId = siteAddress[1];
    let countyId = siteAddress[2];
    if (type === 'add') {
      getAddSite({
        name: name,
        systemId: systemId,
        address: adress,
        provinceId: provinceId,
        countyId: countyId,
        cityId: cityId,
        coolingArea: coolingArea,
        heatingArea: heatingArea,
        coolingBeginTime: NcoolingBeginTime,
        coolingEndTime: NcoolingEndTime,
        heatingBeginTime: NheatingBeginTime,
        heatingEndTime: NheatingEndTime,
        leader: leader,
        phoneNumber: phoneNumber,
        isHealthy: isHealthy,
      });
    } else {
      getAmendSite({
        id:id,
        name: name,
        systemId: systemId,
        address: adress,
        provinceId: provinceId,
        countyId: countyId,
        cityId: cityId,
        coolingArea: coolingArea,
        heatingArea: heatingArea,
        coolingBeginTime: NcoolingBeginTime,
        coolingEndTime: NcoolingEndTime,
        heatingBeginTime: NheatingBeginTime,
        heatingEndTime: NheatingEndTime,
        leader: leader,
        phoneNumber: phoneNumber,
        isHealthy: isHealthy,
      });
    }

    props.onSubmit();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{}}>
      {(type === 'add' || List) && (
        <Row justify={'space-between'}>
          <Col span={7}>
            <Form.Item
              label="站点名称:"
              name="name"
              initialValue={List && List.name}
              rules={[{ required: true, message: '请输入站点名称' }]}
            >
              <Input placeholder="请输入站点名称" />
            </Form.Item>
          </Col>

          <Col span={7}>
            <Form.Item
              label="所属系统："
              name="systemId"
              rules={[{ required: true, message: '请选择所属系统' }]}
              initialValue={List && List.systemId.toString()}
            >
              <Select
                placeholder="请选择所属系统"
              >
                <Option value="1">光合谷</Option>
                <Option value="green">Green</Option>
                <Option value="blue">Blue</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={7}>
            <Form.Item
              label="站点所在地"
              name="siteAddress"
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
      )}
      {(type === 'add' || List) && (
        <Row justify={'space-between'}>
          <Col span={24}>
            <Form.Item
              label="站点详细地址"
              name="adress"
              initialValue={List && List.address}
              rules={[{ required: true, message: '请输入站点详细地址' }]}
            >
              <Input placeholder="请输入站点详细地址" />
            </Form.Item>
          </Col>
        </Row>
      )}
      {(type === 'add' || List) && (
        <Row justify={'space-between'}>
          <Col span={7}>
            <Form.Item
              label="供冷面积(万㎡)："
              name="coolingArea"
              initialValue={List && List.coolingArea}
              rules={[{ required: true, message: '请输入供冷面积' }]}
            >
              <Input placeholder="请输入供冷面积" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="供冷季开始日期"
              initialValue={List && newcoolingBeginTime}
              name="coolingBeginTime"
              rules={[{ required: true, message: '请选择供冷季开始日期' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                placeholder="请选择供冷季开始日期"
              />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="供冷季结束日期"
              name="coolingEndTime"
              initialValue={List && newcoolingEndTime}
              rules={[{ required: true, message: '请选择供冷季结束日期' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                placeholder="请选择供冷季结束日期"
              />
            </Form.Item>
          </Col>
        </Row>
      )}
      {(type === 'add' || List) && (
        <Row justify={'space-between'}>
          <Col span={7}>
            <Form.Item
              label="供热面积(万㎡)："
              name="heatingArea"
              initialValue={List && List.heatingArea}
              rules={[{ required: true, message: '请输入供热面积' }]}
            >
              <Input placeholder="请输入供热面积" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="供热开始日期"
              name="heatingBeginTime"
              initialValue={List && newheatingBeginTime}
              rules={[{ required: true, message: '请选择供热开始日期' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                placeholder="请选择供热开始日期"
              />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="供热结束日期"
              name="heatingEndTime"
              initialValue={List && newheatingEndTime}
              rules={[{ required: true, message: '请选择供热结束日期' }]}
            >
              <DatePicker
                style={{ width: '100%' }}
                placeholder="请选择供热季结束日期"
              />
            </Form.Item>
          </Col>
        </Row>
      )}
      {(type === 'add' || List) && (
        <Row justify={'space-between'}>
          <Col span={7}>
            <Form.Item
              label="负责人"
              name="leader"
              initialValue={List && List.leader}
              rules={[{ required: true, message: '请输入负责人姓名' }]}
            >
              <Input placeholder="请输入负责人姓名" />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="联系电话"
              name="phoneNumber"
              initialValue={List && List.phoneNumber}
              rules={[{ required: true, message: '请输入负责人联系电话' }]}
            >
              <Input placeholder="请输入负责人联系电话" maxLength={11} />
            </Form.Item>
          </Col>
          <Col span={7}>
            <Form.Item
              label="消防设备"
              name="isHealthy"
              rules={[{ required: true, message: '请选择组态看板类型' }]}
              initialValue = {List ? List.isHealthy.toString() : '1'}
            >
              <Radio.Group
              >
                <Radio value="1"> 健全</Radio>

                <Radio value="0"> 缺失</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      )}
      {(type === 'add' || List) && (
        <Row justify={'space-between'}>
          <Col span={24}>
            <Form.Item
              label="备注"
              name="remarks"
              initialValue={List && List.remarks}
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
      )}

      <ModalFooter
        cancelFun={() => {
          props.onClose();
        }}
      />
    </Form>
  );
};

export default Add;
