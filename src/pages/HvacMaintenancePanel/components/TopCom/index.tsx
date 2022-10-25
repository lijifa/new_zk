import React, { memo } from 'react';
import styles from './index.less';

const TopCom = memo((props) => {
  let { 
      title = '默认标题',
      onePicture = '',
      twoPicture = '',
      threePicture = '',
      titleo = '默认总数',
      titletw = '默认总数',
      titleth = '默认总数',
      Num1 = 0,
      Num2 = 0,
      Num3 = 0,
      color1 = '',
      color2 = '',
      color3 = ''
    
    } = props.Tproperty;
  return (
    <div className={styles.module} style={{ flex: '1' }}>
      <div className={styles.moduleMargin}>
        <div className={styles.moduleTitle}>
          <img src={require('./img/titleImg.png')} />
          <span>{title}</span>
        </div>
        <div className={styles.moduleInner}>
          <div className={styles.imgTitleNum}>
            <img src={onePicture}/>
            <div className={styles.Imgtitle}>{titleo}</div>
            <div
              className={styles.imgNum}
              style={{ color: color1 }}
            >
              {Num1}
            </div>
          </div>
          <div className={styles.imgline}></div>
          <div className={styles.imgTitleNum}>
            <img src={twoPicture} />
            <div className={styles.Imgtitle}>{titletw}</div>
            <div
              className={styles.imgNum}
              style={{ color: color2 }}
            >
              {Num2}
            </div>
          </div>
          <div className={styles.imgline}></div>
          <div className={styles.imgTitleNum}>
            <img src={threePicture} />
            <div className={styles.Imgtitle}>{titleth}</div>
            <div
              className={styles.imgNum}
              style={{ color: color3 }}
            >
              {Num3}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default TopCom;
