import { Button, Select } from 'antd';
import React, { memo, useEffect, useImperativeHandle, useState } from 'react';

const { Option } = Select;

const NewSelect = memo((props: any) => {
  let { List, Placeholder,onref } = props;
  const [value,setvalue] = useState()
  useImperativeHandle(onref,()=>{
    return {
       reset:setReset
    }

  })
  const setReset= ()=>{
      setvalue(undefined)
  }
  const setoption = (e:any)=>{
     setvalue(e)
  }
  return (
    <>
      <Select
        style={{ width: '100%' }}
        showSearch
        optionFilterProp="children"
        onChange={setoption}
        value={value}
        placeholder={Placeholder}
        filterOption={(input, option) =>
          (option!.children as unknown as string)
            .toLowerCase()
            .includes(input.toLowerCase())
        }
      >
        {List.map((item: any, index: any) => {
          return (
            <Option key={item.id} value={item.id}>
              {item.text}
            </Option>
          );
        })}
      </Select>

    </>
  );
});

export default NewSelect;
