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
      <Row justify={'space-between'}>
        <Col span={24} className={styles.table_box}>
          <div className={styles.labelContern}>
            <div className={styles.labelConternItem}>
              <label>编号:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>信号模板名称:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>信号种类:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>协议类型:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>启停状态:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>协议格式值:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>设备所属站点:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>设备名称:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>设备参数类型</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>是否控制点位:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>信号频率(s):</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>设备绑定状态:</label>
              <span className={styles.content}>--</span>
            </div>

            <div className={styles.labelConternItem}>
              <label>所属网关:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>信号读取方式:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>是否累计值:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>实际信号:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>最大阈值:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>最小阈值:</label>
              <span className={styles.content}>--</span>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className={styles.hrs}>
            <div className={styles.left_icon} />
            <span>{'设备参数(合计1)'}</span>
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
