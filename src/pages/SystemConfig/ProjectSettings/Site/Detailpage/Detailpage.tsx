interface Props {
  //Type: string; // 传入的类型
  id: number; //父传来的id
}
import { getChangeSite } from '@/services/SystemConfig/ProjectSetting/site';
import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import styles from './Detail.less';

const Detailpage = (props: Props) => {
  let { id } = props;
  const [List, setlist] = useState<any>();
  useEffect(() => {
    getChangeSite({ id }).then((res) => {
      let result = res.data;
      setlist(result);
    });
  }, []);

  return (
    <Row justify={'space-between'}>
      <Col span={24} className={styles.table_box}>
        {List && (
          <div className={styles.labelContern}>
            <div className={styles.labelConternItem}>
              <label>站点名称:</label>
              <span className={styles.content}>{List.name}</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>所属系统:</label>
              <span className={styles.content}>{List.systemName}</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>供冷面积:</label>
              <span className={styles.content}>{List.coolingArea}万㎡</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>供热面积:</label>
              <span className={styles.content}>{List.heatingArea}万㎡</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>供冷季开始日期:</label>
              <span className={styles.content}>{List.coolingBeginTime}</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>供冷季结束日期:</label>
              <span className={styles.content}>{List.coolingEndTime}</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>供热季开始日期:</label>
              <span className={styles.content}>{List.heatingBeginTime}</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>供热季结束日期:</label>
              <span className={styles.content}>{List.heatingEndTime}</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>所属地区:</label>
              <span className={styles.content}>{}</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>站点所在地:</label>
              <span className={styles.content}>{List.address}</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>负责人:</label>
              <span className={styles.content}>{List.leader}</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>联系电话:</label>
              <span className={styles.content}>{List.phoneNumber}</span>
            </div>
            <div className={styles.labelConternItem}>
              <label>消防设施:</label>
              <span className={styles.content}>
                {List.isHealthy == '1' ? '健全' : ' 缺失'}
              </span>
            </div>
            <div className={styles.labelConternItem}>
              <span className={styles.content}></span>
            </div>
            <div className={styles.labelConternItem} style={{ width: '100%' }}>
              <label>备注:</label>
              <span className={styles.content}>
                {List.remarks ? List.remarks : '--'}
              </span>
            </div>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default Detailpage;
