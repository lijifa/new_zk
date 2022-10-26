import React, { memo } from 'react'
import styles from './index.less'

const Analyseheader = memo((props:{title:string,rightshow:boolean}) => {
    let {title = "默认标题",rightshow = false} = props
  return (
    <div className={styles.Headertitle}>
      {title}
      {
        rightshow ? <div className={styles.right}>
        <i className={styles.blue}></i>
        <span>日负荷率</span>
      </div> : null

      }
      
      </div>
  )
})

export default Analyseheader