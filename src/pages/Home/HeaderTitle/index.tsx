import React, { memo } from 'react'
import  styles from './index.less'

const HeaderTitle = memo((props:{Title:string}) => {
  let {Title} = props
  
  return (
    <div className={styles.moduleTitle}>
    <img src={require('./img/titleImg.png')} />
    <span>{Title}</span>
  </div>
  )
})

export default HeaderTitle