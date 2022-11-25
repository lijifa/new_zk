import ZKTable from '@/components/ZKTable';
import { Col, Form, Row } from 'antd';
import { memo, useRef } from 'react';
import styles from './index.less';

const Details = memo(() => {
  const [form] = Form.useForm();
  const shareRef = useRef<any>();

  // 表格数据
  const FirstColumns = [
    {
      title: '规格类型',
      dataIndex: 'name',
    },
    {
      title: '规格参数',
      dataIndex: 'age',
    },
  ];

  const SecColumns = [
    {
      title: '辅料名称',
      dataIndex: 'name',
    },
    {
      title: '规格型号',
      dataIndex: 'age',
    },
    {
      title: '数量',
      dataIndex: 'address',
    },
    {
      title: '单位',
      dataIndex: 'address',
    },
    {
      title: '品牌',
      dataIndex: 'address',
    },
    {
      title: '生产厂家',
      dataIndex: 'address',
    },
  ];

  return (
    <div style={{ height: 730, overflowY: 'auto' }}>
      <Form form={form} layout="vertical" initialValues={{}}>
        <Row justify={'space-between'}>
          <Col span={24} className={styles.table_box}>
            <div className={styles.labelContern}>
              <div className={styles.labelConternItem}>
                <label>设备名称:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>所属系统:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>所属站点:</label>
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
                <label>设备编号:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>设备型号:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>所属品牌:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>启用日期:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>使用状态:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>安装位置:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>质保时长:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>出厂编号:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>供应厂商:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>保养周期:</label>
                <span className={styles.content}>--</span>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24} className={styles.time_box}>
            <div className={styles.subTitle}>
              <span>设备规格（合计0）</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <div className={'zkTableContent'} style={{ padding: 0 }}>
              <ZKTable
                btnList={[]}
                searchForm={form}
                tableColumns={FirstColumns}
                clickOperBtn={(t: string, d: any) => {}}
                ref={shareRef}
                rowId={'businessAlarmRuleTempId'}
                isRowCheck={false}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={24} className={styles.time_box}>
            <div className={styles.subTitle}>
              <span>设备文档</span>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
});

export default Details;
