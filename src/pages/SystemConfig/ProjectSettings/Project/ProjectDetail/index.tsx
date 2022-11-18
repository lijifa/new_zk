interface Props {
  onClose: Function; // 关闭按钮回调方法
  onSubmit: Function; // 提交按钮回调方法
  //Type: string; // 传入的类型
}
import ModalFooter from '@/components/ModalFooter';
import { Card, Col, Form, Image, Row } from 'antd';
import styles from './index.less';
import ZKTable from '@/components/ZKTable';


const onChange = (value: string[]) => {
  console.log(value);
};

const ProjectDetail = (props: Props) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    props.onSubmit();
  };
  const columns = [
    {
      title: '站点名称',
      dataIndex: 'reason',
      align: 'left',
    },
    {
      title: '所属系统',
      dataIndex: 'systemName',
    },
    {
      title: '创建人',
      dataIndex: 'siteName',
    },
    {
      title: '创建时间',
      dataIndex: 'siteProject',
    },
  ];

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{}}>
      <Row justify={'space-between'}>
        <Col span={24} className={styles.table_box}>
          <div className={styles.labelContern}>
            <div className={styles.labelConternItem}>
              <label>项目名称:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>项目类型:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>项目总金额:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>项目总面积:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>供冷/供热面积:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>项目所在地:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>联系人姓名:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>联系人电话:</label>
              <span className={styles.content}>--</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>用能人数:</label>
              <span className={styles.content}>--</span>
            </div>
          </div>
        </Col>
      </Row>
      <Row justify={'space-between'}>
        <Col span={24}>
          <Card style={{ width: '100%' }}>
            <span>项目简介:</span>
          </Card>
        </Col>
      </Row>
      <Row justify={'space-between'}>
        <Col span={24} style={{ paddingRight: '10px' }}>
          <div className={styles.pubtitle}>
            <span></span>项目照片
          </div>
          <div style={{ marginTop: '10px' }}>
            <Image
              width={150}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </div>
        </Col>
      </Row>
      <Row justify={'space-between'}>
        <Col span={24}>
          <div className={styles.pubtitle}>
            <span></span>项目绑定站点(合计0)
          </div>
          <div className={'zkTableContent'} style={{padding:'0',marginTop:'10px'}}>
     

          <ZKTable
            rowId={'businessAlarmRuleTempId'}
            btnList={[]}
            isRowCheck = {false}
            searchForm={form}
            tableColumns={columns}
            //tableDataFun={getTableData} 获取表格数据方法
            defaultFormItem={{
              name: 'hello',
              email: '1',
              phone: '2',
            }}
          />
          </div>
          
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

export default ProjectDetail;
