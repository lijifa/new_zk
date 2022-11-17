import ModalFooter from '@/components/ModalFooter';
import ZKTable from '@/components/ZKTable';
import { Col, Form, Row } from 'antd';
import { useRef } from 'react';
// import styles from './Detail.less';

interface Props {
  onClose: Function; // 关闭按钮回调方法
  onSubmit: Function; // 提交按钮回调方法
}

const Add = (props: Props) => {
  const [form] = Form.useForm();
  const shareRef = useRef<any>();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    props.onSubmit();
  };

  // 表格数据
  const columns = [
    {
      title: '信号值',
      dataIndex: 'name',
    },
    {
      title: '页面显示',
      dataIndex: 'age',
    },
    {
      title: '信号状态',
      dataIndex: 'address',
    },
  ];

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{}}>
      <Row justify={'space-between'}></Row>
      <Row>
        <Col span={24}>
          <div className={'zkTableContent'}>
            <ZKTable
              btnList={[]}
              searchForm={form}
              tableColumns={columns}
              clickOperBtn={(t: string, d: any) => {}}
              ref={shareRef}
              isRowCheck={false}
            />
          </div>
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
