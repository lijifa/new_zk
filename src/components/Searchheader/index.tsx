import { Button, DatePicker, Input, Select } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import React, { memo, useEffect, useState } from 'react';
import styles from './index.less';
interface Props {
  List?: any; //选择框数据
  placeholder?: Array<string>; //默认输入值
  type: string; //选择框类型 none:没有时间框 year：年份时间选择框,month月份选择器,defalut：默认显示为字
  Inputdefalut?: Array<string>; //input的默认值决定input选择框的数量
  setlectdefalut?:Array<number | undefined> ;//给select默认的值，有几个输入框填几个
  inputvaluedefalut?:Array<string>;//给输入一个默认值
}
const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const Searchheader = memo((props: Props) => {
  let { List, placeholder, type, Inputdefalut,setlectdefalut,inputvaluedefalut} = props;
  const [selectData, SetSelectData] = useState(List);//父组件传来的数据
  const [newvalue, Setnewvalue] = useState<Array<number | undefined | null>>(setlectdefalut); //多选框
  const [time, settime] = useState<any>(''); //时间
  const [inputvalue, setinputvalue] = useState<Array<string|undefined|null>>(inputvaluedefalut); //输入框值
  const [Timevalue,setTimeValue] = useState<Array<string>>([])//选择的开始与结束时间
  //重置按钮方法
  const setRest = () => {
    const newArr = newvalue.map((_) => undefined);
    Setnewvalue(newArr); //重置选择框
    settime(new Date()); //重置时间
    setinputvalue(inputvaluedefalut); //重置输入框
  };
  //点击搜索触发调用
  const onsearch =()=>{
    console.log(newvalue,inputvalue)
    console.log(Timevalue)
  }
  useEffect(() => {
    SetSelectData(List);
  });
  //改变事件调用
  const setTime = (time :any,dateString:any) => {
    console.log(time,dateString);
    let StartTime = dateString[0]
    let EndTime = dateString[1]
    setTimeValue([StartTime,EndTime])
  };
  //改变多选框调用
  const setstale = (value: any, index?: any) => {
    const newIndex = newvalue.map((item, Itemindex) =>
      index === Itemindex ? value : item,
    );
    Setnewvalue(newIndex);
  };
  //改变输入框调用
  const changeInputvalue = (event: any, index: any) => {
    ///setinputvalue(event.target?.value);
    const newIndex = inputvalue.map((item, Itemindex) =>
      index === Itemindex ? event.target?.value : item,
    );
    setinputvalue(newIndex);
  };
  //选择日历
  function ChooseDate(type: string) {
    let result;
    switch (type) {
      case 'none':
        result = <></>;
        break;
      case 'year':
        result = (
          <>
            <DatePicker picker="year" format={dateFormat} locale={locale} onChange={setTime} />
          </>
        );
        break;
      case 'month':
        result = (
          <>
            <DatePicker picker="month" format={dateFormat} locale={locale} onChange={setTime} />
          </>
        );
        break;
      case 'picker':
        result = (
          <>
            <RangePicker
              defaultValue={[
                moment('2015/01/01', dateFormat),
                moment('2015/01/01', dateFormat),
              ]}
              format={dateFormat}
              locale={locale}
              onChange={setTime}
            />
          </>
        );
        break;
      case 'defalut':
        result = (
          <>
            <RangePicker
              format={dateFormat}
              locale={locale}
              onChange={setTime}
              key={time}
            />
          </>
        );

      default:
        break;
    }
    return result;
  }

  return (
    <div className={styles.moduleTitle}>
      <ul className={styles.moduleUl}>
        {/* <Input
            placeholder="请输入缴费单位搜索"
            value={inputvalue}
            onChange={setInputvalue}
          /> */}
        {Inputdefalut&&Inputdefalut.map((item, index) => {
          return (
            <li key={index}>
              <Input
                value={inputvalue[index]}
                onChange={(value) => changeInputvalue(value, index)}
                placeholder={item}
                key={index}
              />
            </li>
          );
        })}

        {selectData&&selectData.map((item: any, index: number) => {
          return (
            <li key={index}>
              <Select
                style={{ width: '100%' }}
                placeholder={placeholder&&placeholder[index]}
                onChange={(value) => setstale(value, index)}
                value={newvalue[index]}
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option!.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                // options={item.map((iten: { text: string; id: number }) => ({
                //   label: iten.text,
                //   value: iten.id,
                // }))}
              >
                {item.map((iten: any, index: any) => {
                  return (
                    <Option key={index} value={iten.id} label={iten.text}>
                      {iten.text}
                    </Option>
                  );
                })}
              </Select>
            </li>
          );
        })}
        <li style={{ width: type === 'none' ? '0px' : '260px' }}>
          {ChooseDate(type)}
        </li>
        <li>
          <Button
            onClick={onsearch}
            type="primary"
            style={{
              textAlign: 'center',
              alignItems: 'center',
            }}
          >
            搜索
          </Button>
          <Button
            onClick={setRest}
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
