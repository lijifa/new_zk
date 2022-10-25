import styles from './index.less';

interface BoardBack {
  title: any;
  subTitle?: any;
  content?: any;
}

// 如果是横向排布content这样传参
// icon：any 必填
// title：string 必填
// num：number 选填
/*          <>
              <Item_H
                icon={<img src={require('./plan.png')} />}
                title={'当日计划能耗'}
                num={351.52}
              />
              <Item_H
                icon={<PlayCircleOutlined />}
                title={'当日能耗'}
                num={262.79}
              />
              <Item_H
                icon={<PlayCircleOutlined />}
                title={'当日能耗'}
                num={22.79}
              />
            </>  
    */
// 如果是竖向排布content这样传参
// icon：any 必填
// title：string 必填
// num：number 必填
// line：number | string 选填
/*        <>
              <div>
                <Item_V icon={<img src={img} />} title={'通用设备'} num={73} />
                <Item_V
                  icon={<img src={img} />}
                  title={'通用设备'}
                  num={73}
                  marginTop={'20%'}
                />
              </div>
              <div>
                <Item_V icon={<img src={img} />} title={'通用设备'} num={73} />
                <Item_V
                  icon={<img src={img} />}
                  title={'通用设备'}
                  num={73}
                  marginTop={'20%'}
                />
              </div>
            </> 
    */

const BoardBack = ({ title, subTitle, content }: BoardBack) => {
  return (
    <>
      <div className={styles.content}>
        <div className={styles.topLine} />
        <div className={styles.header}>
          <div className={styles.Icon} />
          <div className={styles.titleRight}>
            <div className={styles.title}>{title}</div>
            <div className={styles.subTitle}>{subTitle}</div>
          </div>
        </div>
        <div className={styles.container}>{content}</div>
      </div>
    </>
  );
};
export default BoardBack;
