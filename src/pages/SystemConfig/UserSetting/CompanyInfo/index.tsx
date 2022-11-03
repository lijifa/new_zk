import { PageHeader } from '@/components/SubHeader';
import { Image } from 'antd';
import styles from './index.less';

const CompanyInfo = () => {
  return (
    <>
      <PageHeader title="公司信息" />
      <div className={styles.content}>
        <div className={styles.tableBox}>
          <table>
            <tbody>
              <tr>
                <td className={styles.th}>企业名称：</td>
                <td style={{ width: 180 }}>
                  <div className={styles.items}></div>
                </td>
                <td className={styles.th}>所属行业：</td>
                <td style={{ width: 180 }}>
                  <div className={styles.items}></div>
                </td>
                <td className={styles.th}>人员规模：</td>
                <td style={{ width: 180 }}>
                  <div className={styles.items}></div>
                </td>
              </tr>
              <tr>
                <td className={styles.th}>所属地区：</td>
                <td>
                  <div className={styles.items}></div>
                </td>
                <td className={styles.th}>详细地址：</td>
                <td>
                  <div className={styles.items}></div>
                </td>
                <td className={styles.th}>营业期限：</td>
                <td>
                  <div className={styles.items}></div>
                </td>
              </tr>
              <tr>
                <td className={styles.th}>组织机构代码：</td>
                <td>
                  <div className={styles.items}></div>
                </td>
                <td className={styles.th}>注册时间：</td>
                <td>
                  <div className={styles.items}></div>
                </td>
                <td className={styles.th}>联系人：</td>
                <td>
                  <div className={styles.items}></div>
                </td>
              </tr>
              <tr>
                <td className={styles.th}>联系电话：</td>
                <td>
                  <div className={styles.items}></div>
                </td>
                <td className={styles.th}>审核状态：</td>
                <td>
                  <div className={styles.items}></div>
                </td>
                <td className={styles.th}></td>
                <td>
                  <div className={styles.items}></div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.subTitle}>
          <span>企业营业执照</span>
        </div>
        <div className={styles.ImgBox}>
          <Image
            width={120}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
      </div>
    </>
  );
};

export default CompanyInfo;
