interface Props {
  onClose: Function; // 关闭按钮回调方法
  onSubmit: Function; // 提交按钮回调方法
  type: string; // 传来的类型
  id: number | undefined; //
  ref: any; //父组件传递的ref
  system: { label: string; value: string }[] | undefined; //父组件传递系统
}
import ModalFooter from '@/components/ModalFooter';
import {
  getAddSite,
  getAmendSite,
  getChangeSite,
  getVoltagechange,
  getProvince
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
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import Ischange from '../Ischange';

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
];

const Add = forwardRef((props: Props, ref) => {
  const { type, id, system } = props;
  const [List, setlist] = useState<any>();
  const [voltage, setVoltage] = useState<{ label: string; value: string }[]>();
  const [del, setDel] = useState<boolean>(false);
  const [checkStystem, setcheckSystem] = useState<string>('');

  useEffect(() => {
    if (type === 'add') {
      setlist(undefined);
      getVoltagechange({}).then((res) => {
        let voltageData = res.data.map((item: any) => ({
          label: item.name,
          value: item.id.toString(),
        }));

        setVoltage(voltageData);
      });
      getProvince({}).then(res=>{
        console.log(res)

      })
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
      voltageLevel,
      transformerCapacity,
    } = values;
    console.log(transformerCapacity, voltageLevel);
    let NheatingEndTime =
      heatingEndTime && heatingEndTime.format('YYYY-MM-DD HH:mm:ss');
    let NheatingBeginTime =
      heatingBeginTime && heatingBeginTime.format('YYYY-MM-DD HH:mm:ss');
    let NcoolingEndTime =
      coolingEndTime && coolingEndTime.format('YYYY-MM-DD HH:mm:ss');
    let NcoolingBeginTime =
      coolingBeginTime && coolingBeginTime.format('YYYY-MM-DD HH:mm:ss');
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
        voltageLevel: voltageLevel,
        transformerCapacity: transformerCapacity,
      });
    } else {
      getAmendSite({
        id: id,
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
        voltageLevel: voltageLevel,
        transformerCapacity: transformerCapacity,
      });
    }

    props.onSubmit();
  };
  useImperativeHandle(ref, () => {
    return {
      changshow,
    };
  });
  //显示/隐藏
  function changshow(type: string) {
    if (type === 'show') {
      setDel(true);
    } else {
      setDel(false);
    }
  }
  //选择供配电
  const changeCheck = (value: string) => {
    setcheckSystem(value);
  };

  function changelayout(checkStystem: string) {
    console.log(checkStystem);
    if (checkStystem === '4') {
      return (
        <>
          {(type === 'add' || List) && (
            <Row justify={'space-between'}>
              <Col span={7}>
                <Form.Item
                  label="配电室电压等级："
                  name="voltageLevel"
                  initialValue={List && List.heatingArea}
                  rules={[{ required: true, message: '请选择配电室电压等级' }]}
                >
                  <Select
                    placeholder="请选择配电室电压等级"
                    options={voltage}
                    showSearch
                    optionFilterProp="label"
                    filterOption={(input, option) =>
                      (option?.label ?? '').includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      (optionA?.label ?? '')
                        .toLowerCase()
                        .localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                  />
                </Form.Item>
              </Col>
              <Col span={7}>
                <Form.Item
                  label="变压器容量"
                  name="transformerCapacity"
                  initialValue={List && newheatingBeginTime}
                  rules={[{ required: true, message: '请输入变压器容量' }]}
                >
                  <Input placeholder="请输入变压器容量" />
                </Form.Item>
              </Col>
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
            </Row>
          )}

          {(type === 'add' || List) && (
            <Row>
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
              <Col span={7} style={{ marginLeft: '78px' }}>
                <Form.Item
                  label="消防设备"
                  name="isHealthy"
                  rules={[{ required: true, message: '请选择组态看板类型' }]}
                  initialValue={List ? List.isHealthy.toString() : '1'}
                >
                  <Radio.Group>
                    <Radio value="1"> 健全</Radio>

                    <Radio value="0"> 缺失</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          )}
        </>
      );
    } else {
      return (
        <>
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
                  initialValue={List ? List.isHealthy.toString() : '1'}
                >
                  <Radio.Group>
                    <Radio value="1"> 健全</Radio>

                    <Radio value="0"> 缺失</Radio>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          )}
        </>
      );
    }
  }
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{}}
      >
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
                  options={system}
                  onChange={changeCheck}
                  showSearch
                  optionFilterProp="label"
                  filterOption={(input, option) =>
                    (option?.label ?? '').includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '')
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                />
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
        {changelayout(checkStystem)}
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
      <Ischange
        Show={del}
        Content='确定修改项目信息?'
        Delete={() => {
          setDel(false);
        }}
        Cancal={() => {
          setDel(false);
        }}
      />
    </>
  );
});

export default Add;
