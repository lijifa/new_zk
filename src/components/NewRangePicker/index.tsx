import { DatePicker } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import React, { memo, useImperativeHandle, useState } from 'react';

const { RangePicker } = DatePicker;

const NewRangePicker = memo((props) => {
  let {onref} = props
  const [newvalue,setnewvalue] = useState()
  const dateFormat = 'YYYY/MM/DD';
  const changetime = (value:any)=>{
  } 
  useImperativeHandle(onref,()=>{
      return {
          reset:setReset 
      }
  })
  const setReset = () =>{
      setnewvalue(undefined)
  }
  return (

    <>
      <RangePicker
       showTime format={dateFormat} locale={locale} 
       onChange={changetime}
       value={newvalue}
       
       />
    </>
  );
});

export default NewRangePicker;
