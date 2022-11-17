import ZKTable from '@/components/ZKTable';
import { Col, Form, Row } from 'antd';
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
      title: '参数名称',
      dataIndex: 'name',
    },
    {
      title: '所属站点',
      dataIndex: 'address',
    },
  ];

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{}}>
      <Row justify={'space-between'}>
        <Col span={24} className={styles.table_box}>
          <div className={styles.labelContern}>
            <div className={styles.labelConternItem}>
              <label>设备编号:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>设备名称:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>设备种类:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>一级分类:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>二级分类:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>所属站点:</label>
              <span className={styles.content}>--</span>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className={styles.hrs}>
            <div className={styles.left_icon} />
            <span>{'抄表参数(合计0)'}</span>
          </div>
        </Col>
      </Row>
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
      {/* <ModalFooter
        cancelFun={() => {
          props.onClose();
        }}
      /> */}
    </Form>
  );
};

export default Add;
