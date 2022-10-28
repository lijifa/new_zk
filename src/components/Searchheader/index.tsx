import { Button, DatePicker, Select } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import React, { memo } from 'react';
import styles from './index.less';
const { Option } = Select;
const { RangePicker } = DatePicker;
interface Props {
  time: boolean; //是否有时间选择,
  type: number; //选择框的数量
  smallcheck?: boolean; //是否需要小的选择框
  list ?: Array<any> //用户传入的数据
}


const Searchheader = memo((props: Props) => {
  let { time, type, smallcheck = false ,list } = props;
  const dateFormat = 'YYYY/MM/DD';
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
  // let type = 5
  let newlist: Array<any> = [];
  for (let i = 0; i < type; i++) {
    newlist.push(i);
  }
  return (
    <div className={styles.moduleTitle}>
      <ul className={styles.moduleUl}>
        {newlist.map((item, index) => {
          return (
            <li key={index}>
              <Select
                style={{ width: '100%' }}
                showSearch
                placeholder="静海区政府主楼变电室"
                defaultValue="jack"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  (option!.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                <Option value="jack">静海区政府西楼变电室</Option>
                <Option value="lucy">静海区政府东楼变电室</Option>
                <Option value="tom">静海区政府关楼变电室</Option>
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
