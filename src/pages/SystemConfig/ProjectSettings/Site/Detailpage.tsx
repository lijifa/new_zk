interface Props {
  onClose: Function; // 关闭按钮回调方法
  onSubmit: Function; // 提交按钮回调方法
  //Type: string; // 传入的类型
}
import ModalFooter from '@/components/ModalFooter';
import ZKTable from '@/components/ZKTable';
import { getalarmNoticeList } from '@/services/Ralis/WarningList';
import { Button, Form, Input, Select, Space, Tag } from 'antd';
import { useRef, useState } from 'react';




const onChange = (value: string[]) => {
  console.log(value);
};

const Detailpage = (props: Props) => {
  const [form] = Form.useForm();

 

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    props.onSubmit();
  };






  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{}}>
      

   

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

export default Detailpage;
