import { Button, DatePicker, Select } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import React, { memo, useEffect, useState } from 'react';
import styles from './index.less';
const { Option } = Select;
const { RangePicker } = DatePicker;
interface Props {
  time: boolean; //是否有时间选择,
  type: number; //选择框的数量
  smallcheck?: boolean; //是否需要小的选择框
  list?: Array<any>; //用户传入的数据
  serarch?: boolean; //是否有搜索框
  placeholder?: Array<string>; //选择框默认文字
}
//默认文字

const Searchheader = memo((props: Props) => {
  let {
    time,
    type,
    smallcheck = false,
    list,
    serarch = false,
    placeholder = ['我是默认标题'],
  } = props;
  const dateFormat = 'YYYY/MM/DD';
  const [newvalue, setvalue] = useState<any>([]);

  function Time(time: boolean) {
    let result;
    switch (time) {
      case true:
        result = (
          <>
            <li style={{ width: '260px' }}>
              <RangePicker
                defaultValue={[
                  moment('2015/01/01', dateFormat),
                  moment('2015/01/01', dateFormat),
                ]}
                format={dateFormat}
                locale={locale}
              />
            </li>
          </>
        );
        break;
      case false:
        result = <></>;
        break;
      default:
        break;
    }
    return result;
  }

  let newlist: Array<any> = [];
  for (let i = 0; i < type; i++) {
    newlist.push(i);
  }
  //重置按钮
  const setReset = () => {
    setvalue([undefined]);
    console.log(newvalue);
  };
  let newvalue2:Array<any> = []
  const onChange = (value: any,index:any) => {
    newvalue2.push(value)
    // if(newvalue2.length === 2){
    //   setvalue(newvalue2)
    // }else if(newvalue2.length ===3){
    //   setvalue(newvalue2)
    // }
    let length = newvalue2.length
    console.log(index,'%%%%%%%%%%%%%%%%%%%%%%%%')

    let Value : Array<any> = []
    switch(length){
      case 1 :
        Value = [newvalue2,undefined,undefined]
        break
      case 2 :
        Value = [newvalue2,undefined]
        break
      case 3 :
        Value = [newvalue2]
        break
        default:
          break
    }
    return setvalue(Value)
  };
  useEffect(()=>{

  },[length])

  const onChanges = (e: any) => [console.log(e)];

  return (
    <div className={styles.moduleTitle}>
      <ul className={styles.moduleUl}>
        {serarch ? (
          <li>
            <Select
              showSearch
              onSearch={onChanges}
              placeholder="请输搜索内容"
              style={{ width: '100%' }}
              defaultActiveFirstOption={false}
              showArrow={false}
              filterOption={false}
              notFoundContent={null}
            ></Select>
          </li>
        ) : (
          ''
        )}

        {list?.map((item: any, index: any) => {
          return (
            <li key={index}>
              <Select
                key={index}
                style={{ width: '100%' }}
                showSearch
               // labelInValue={true}
                onChange={ (value,index) => onChange(value,index)}
                value={newvalue[index]}
                placeholder={placeholder[index]}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option!.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {item.map((iten: any, index: any) => {
                  return (
                    <Option key={index} value={iten.id}>
                      {iten.text}
                    </Option>
                  );
                })}
              </Select>
            </li>
          );
        })}

        {smallcheck === true ? (
          <li style={{ minWidth: '80px', width: '80px' }}>
            <Select
              style={{ width: '100%' }}
              showSearch
              placeholder="每日"
              defaultValue="jack"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option!.children as unknown as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              <Option value="jack">每日</Option>
              <Option value="lucy">每月</Option>
            </Select>
          </li>
        ) : (
          ''
        )}
        {Time(time)}

        <li>
          <Button
            type="primary"
            style={{
              textAlign: 'center',
              alignItems: 'center',
            }}
          >
            搜索
          </Button>
          <Button
            onClick={setReset}
            style={{
              color: ' #268CFF',
              marginLeft: '10px',
            }}
          >
            重置
          </Button>
        </li>
      </ul>
    </div>
  );
});

export default Searchheader;
