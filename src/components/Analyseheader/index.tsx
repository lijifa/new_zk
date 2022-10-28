import React, { memo } from 'react';
import styles from './index.less';

interface Props {
  title: string;
  type?: any; //类型
  data?: Array<Data>; //传入的数据需要 color:'',text:''
}
interface Data {
  text: string | number; //名称
  color: any; //颜色
}

const Analyseheader = memo((props: Props) => {
  let { title = '默认标题', type, data } = props;
  console.log(type);
  function Righttabs(type: any) {
    let result;
    switch (type) {
      case 'square':
        result = (
          <>
            <div className={styles.right}>
              {data.map((item: any, index: number) => {
                return (
                  <>
                    <li
                      key={index}
                      className={styles.square}
                      style={{ backgroundColor: item?.color }}
                    ></li>
                    <span>{item?.text}</span>
                  </>
                );
              })}
            </div>
          </>
        );
        break;
      case 'rectangle':
        result = (
          <>
            <div className={styles.right}>
              {data?.map((item: any, index: number) => {
                return (
                  <>
                    <li
                      key={index}
                      className={styles.rectangle}
                      style={{ backgroundColor: item?.color }}
                    ></li>
                    <span>{item?.text}</span>
                  </>
                );
              })}
            </div>
          </>
        );
        break;
      default:
        break;
    }
    return result;
  }
  return (
    <div className={styles.Headertitle}>
      {title}
      {Righttabs(type)}
    </div>
  );
});

export default Analyseheader;
