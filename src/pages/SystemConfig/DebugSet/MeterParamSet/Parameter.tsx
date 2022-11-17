import ModalFooter from '@/components/ModalFooter';
import ZKTable from '@/components/ZKTable';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Space } from 'antd';
import { useRef } from 'react';
import styles from './Detail.less';

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
      title: '编号',
      dataIndex: 'name',
    },
    {
      title: '抄表参数名称',
      dataIndex: 'name',
    },
    {
      title: '抄表参数类型',
      dataIndex: 'name',
    },
    {
      title: '所属站点',
      dataIndex: 'address',
    },
  ];

  // 点击搜索、重置按钮
  const searchOper = (type: string) => {
    shareRef?.current?.clickSearchBtn(type);
  };

  // 高级搜索栏Form
  const advanceSearchForm = (
    <div className="zkSearchBox">
      <Form form={form}>
        <Space align="center">
          <Form.Item name="name">
            <Input placeholder="请输入设备名称搜索" />
          </Form.Item>
          <Form.Item name="name">
            <Input placeholder="请输入设备名称搜索" />
          </Form.Item>
          <Form.Item name="name">
            <Input placeholder="请输入编号搜索" />
          </Form.Item>
          <Form.Item name="name">
            <Input placeholder="请输入抄表参数名称搜索" />
          </Form.Item>
          <Button type="primary" onClick={() => searchOper('submit')}>
            搜索
          </Button>
          <Button onClick={() => searchOper('reset')}>重置</Button>
        </Space>
      </Form>
    </div>
  );

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{}}>
      <Row>
        <Col span={24}>
          <div className={'zkTableContent'}>
            {advanceSearchForm}

            <div className={styles.warn_box}>
              <div className={styles.text}>
                <ExclamationCircleFilled />
                <span>请添加抄表参数</span>
              </div>
              <div className={styles.warn_text}>
                <ExclamationCircleFilled />
                <span>注：已被设备绑定的抄表参数，无法再被绑定</span>
              </div>
            </div>

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
