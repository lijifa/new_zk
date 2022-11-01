import React, { memo, useEffect, useRef, useState } from 'react';
import styles from './index.less';
interface Props {
  waring: Array<any>;
  agg?: boolean;
}
interface REF {
  current: any;
}
const ScrollList = memo((props: Props) => {
  let { waring, agg = true } = props;
  const PersonRef: REF = useRef<HTMLDivElement | undefined>();
  const [isScrolle, setIsScrolle] = useState<boolean>(true);
  const Child1Ref: REF = useRef(); //子组件一
  const Child2Ref: REF = useRef();
  const [ChildTran, setCildTran] = useState(0);
  const speed = 50; //移动速度

  useEffect(() => {
    let time: any;
    Child2Ref.current.innerHTML = Child1Ref.current.innerHTML;
    let childHeight = Child1Ref.current.offsetHeight;
    let timer: any;
    let scrollTop1 = 0;
    if (isScrolle) {
      timer = setInterval(() => {
        scrollTop1++;
        if (scrollTop1 >= childHeight) {
          scrollTop1 = 0;
          setCildTran(scrollTop1);
        }
        setCildTran(scrollTop1);
      }, speed);
    }

    return () => {
      clearInterval(timer);
    };
  }, [agg, isScrolle]);
  const hoverHandler = () => {
    setIsScrolle(false);
  };
  const ThoverHandler = () => {
    setIsScrolle(true);
  };
  return (
    <div className={styles.position}>
      <div className={styles.gDDiv}>
        <div className={styles.gunDong}>
          <div className={styles.gDitem}>
            <div className={styles.gDlie_title}></div>
            <div className={styles.gDlie_title1} style={{ flex: '10' }}>
              报警原因
            </div>
            <div className={styles.gDlie_title1} style={{ flex: '4' }}>
              报警类型
            </div>
            <div className={styles.gDlie_title1} style={{ flex: '4' }}>
              报警时间
            </div>
            <div className={styles.gDlie_title1} style={{ flex: '2' }}>
              报警等级
            </div>
          </div>
        </div>
        <div className={styles.gDlistOut} ref={PersonRef}>
          <div
            className={styles.moveParent}
            style={{
              width: '100%',
              position: 'absolute',
              transform: `translate(0px,-${ChildTran}px)`,
            }}
          >
            <div className={styles.move} ref={Child1Ref}>
              <ul
                className={styles.gDlistIn}
                onMouseOver={hoverHandler}
                onMouseLeave={ThoverHandler}
              >
                {waring.map((item, index) => {
                  return (
                    <li key={index} className={styles.gDhang0}>
                      <div
                        className={styles.gDhang1}
                        style={{
                          fontSize: '18px',
                          color: 'rgba(0,255,255,1)',
                          flex: '2',
                        }}
                      >
                        {index + 1}
                      </div>
                      <div className={styles.gDhang2} style={{ flex: '10' }}>
                        {item.name}
                      </div>
                      <div className={styles.gDhang2} style={{ flex: '4' }}>
                        {item.waring}
                      </div>
                      <div className={styles.gDhang2} style={{ flex: '4' }}>
                        {item.time}
                      </div>
                      <div className={styles.gDhang2} style={{ flex: '2' }}>
                        <em
                          className={styles.bR4}
                          style={{
                            background:
                              agg === true ? '' : 'rgba(255, 224, 55, 1)',
                          }}
                        ></em>
                        <span
                          className={styles.class4}
                          style={{
                            color: agg === true ? '' : 'rgba(255, 224, 55, 1)',
                          }}
                        >
                          报警
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div
              className={styles.move}
              style={{ width: '100%', marginTop: '-10px' }}
              ref={Child2Ref}
              onMouseOver={hoverHandler}
              onMouseLeave={ThoverHandler}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ScrollList;
