import React, { memo, useEffect, useRef, useState } from 'react';
import styles from './index.less';
interface Props {
  waring : Array<any>,
  agg ?: boolean
}
interface REF {
  current :any
}
const ScrollList = memo((props : Props) => {
  let { waring ,agg=true} = props;
  const PersonRef :REF = useRef<HTMLDivElement | undefined>();
  const [isScrolle, setIsScrolle] = useState<boolean>(true);
  const Child1Ref :REF = useRef();
  const Child2Ref :REF = useRef();
  const Child3Ref :REF= useRef();
  const [top, setTop] = useState(0);
  const [top1, set1Top] = useState(0);
  const speed = 50;//移动数度
  useEffect(() => {
    let time: any;
    Child2Ref.current.innerHTML = Child1Ref.current.innerHTML;
    Child3Ref.current.innerHTML = Child2Ref.current.innerHTML;
    PersonRef.current.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    let timer: any;
    let scrollTop1 = 0;
    if(isScrolle){
      timer = setInterval(() => {
        if (
          scrollTop1 >=
          Child1Ref.current?.scrollHeight +
            Child2Ref.current?.scrollHeight +
            Child3Ref.current?.scrollHeight -
            200
        ) {
          scrollTop1 = 0;
        } else {
          scrollTop1++;
        }
    
        // if(PersonRef.current.scrollTop == null) {
        //   PersonRef.current.scrollTop  = 0
        //   console.log( PersonRef.current.scrollTop,'++++++++++++++++++++++++++++')
        // }
        PersonRef.current.scrollTop = scrollTop1;

      }, speed);
  

    }
    setTop(Child1Ref.current.scrollHeight - 10);
    set1Top(Child1Ref.current.scrollHeight * 2 - 20);
 
    return () => {
      clearInterval(timer);
    };
  }, [agg,isScrolle]);
  const hoverHandler = ()=>{
    setIsScrolle(false)

  }
  const ThoverHandler = () =>{
    setIsScrolle(true)
  }
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
          <div className={styles.move} ref={Child1Ref}>
            <ul className={styles.gDlistIn} onMouseOver={ hoverHandler} onMouseLeave={ ThoverHandler}>
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
                      <em className={styles.bR4} 
                       style ={{background:agg === true ? '' :'rgba(255, 224, 55, 1)'}}
                      ></em>
                      <span className={styles.class4}
                       style ={{color:agg === true ? '' : 'rgba(255, 224, 55, 1)'}}
                      
                      >报警</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <div
            className={styles.move}
            style={{ width: '100%', marginTop: top }}
            ref={Child2Ref}
            onMouseOver={ hoverHandler} onMouseLeave={ ThoverHandler}
          ></div>
          <div
            className={styles.move}
            style={{ width: '100%', marginTop: top1 }}
            ref={Child3Ref}
            onMouseOver={ hoverHandler} onMouseLeave={ ThoverHandler}
          ></div>
        </div>
      </div>
    </div>
  );
});

export default ScrollList;
