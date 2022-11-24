interface Props {
  onClose: Function; // 关闭按钮回调方法
  onSubmit: Function; // 提交按钮回调方法
  //Type: string; // 传入的类型
  id: number; //父组件传递来的类型
}
import ZKTable from '@/components/ZKTable';
import { getCheckProject } from '@/services/SystemConfig/ProjectSetting/project';
import { Col, Image, Row } from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.less';

const ProjectDetail = (props: Props) => {
  const [List, setlist] = useState<any>();
  const { id } = props;
  useEffect(() => {
    getCheckProject({ id }).then((res) => {
      let result = res.data;
      setlist(result);
    });
  }, []);

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
    <>
      <Row justify={'space-between'}>
        <Col span={24} className={styles.table_box}>
          {List && (
            <div className={styles.labelContern}>
              <div className={styles.labelConternItem}>
                <label>项目名称:</label>
                <span className={styles.content}>{List.name}</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>项目类型:</label>
                <span className={styles.content}>{List.projectTypeName}</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>项目总金额:</label>
                <span className={styles.content}>{List.sumMoney}</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>项目总面积:</label>
                <span className={styles.content}>{List.area}</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>项目所在地:</label>
                <span className={styles.content}>{List.address}</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>联系人姓名:</label>
                <span className={styles.content}>--</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>联系人电话:</label>
                <span className={styles.content}>{List.linkmanPhone}</span>
              </div>
              <div className={styles.labelConternItem}>
                <label>用能人数:</label>
                <span className={styles.content}>{List.memberCount}</span>
              </div>
              <div className={styles.labelConternItem}>
                <label></label>
                <span className={styles.content}></span>
              </div>
              <div className={styles.labelConternItem} style={{ width: '99%' }}>
                <label>项目简介:</label>
                <span className={styles.content}>
                  {List.projectIntroduction}
                </span>
              </div>
            </div>
          )}
        </Col>
      </Row>
      <Row justify={'space-between'}>
        <Col span={24} style={{ paddingRight: '10px' }}>
          <div className={styles.pubtitle} style={{ marginTop: '0px' }}>
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
          <div
            className={'zkTableContent'}
            style={{ padding: '0', marginTop: '10px' }}
          >
            <ZKTable
              rowId={'businessAlarmRuleTempId'}
              btnList={[]}
              isRowCheck={false}
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
    </>
  );
};

export default ProjectDetail;
