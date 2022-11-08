import { Button, Form, Select } from 'antd';
import React, { memo, useEffect, useRef, useState } from 'react';
import styles from './index.less';
interface Props {
  List: any; //选择框数据
  placeholder: Array<string>; //默认输入值
}
const { Option } = Select;
const Searchheader = memo((props: Props) => {
  let { List, placeholder } = props;
  const [selectData, SetSelectData] = useState([[], [], []]);
  const forwardref = useRef();
  const [form] = Form.useForm();
  //重置按钮方法
  const setRest = () => {
    form.resetFields();

    // SetSelectData([[], [], []]);
  };
  useEffect(() => {
    SetSelectData(List);
  });
  return (
    <div className={styles.moduleTitle} >
      <Form form={form} initialValues={{name1:111, name2:333, name3:222}}>
        <ul className={styles.moduleUl}>
          {selectData.map((item: any, index: any) => {
            return (
              <li key={index}>
                <Form.Item key={index} name='select'>
                  <Select
                    style={{ width: '100%' }}
                    key={index}
                    placeholder={placeholder[index]}
                    options={item.map((iten: { text: string; id: number }) => ({
                      label: iten.text,
                      value: iten.id,
                    }))}
                  >
                    {/* {item.map((iten: any, index: any) => {
                      return <Option key={iten.id}>{iten.text}</Option>;
                    })} */}
                  </Select>
                </Form.Item>
              </li>
            );
          })}
          <li>
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
      </Form>
    </div>
  );
});

export default Searchheader;
