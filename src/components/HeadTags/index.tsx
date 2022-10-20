import { CloseOutlined, RedoOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Row, Col, Space, Button } from 'antd';
import React, { useState, useEffect } from 'react';
import { useModel } from '@umijs/max';
import styles from './index.less';
const HeadTags: React.FC = () => {
  // const [tagList, setTagList] = useState<Array<{id:string, name:string, url:string}>>([]);
  const [currentValue, setCurrentValue] = useState('1');
  const {initialState} = useModel('@@initialState');
  const { counter } = useModel('navTagsModel');
  const tagList = initialState?.tagMenuData
  // useEffect(() =>{
  //   let tagArr = [{
  //     id: '1',
  //     name: '企业总览',
  //     url: '',
  //   },{
  //     id: '2',
  //     name: 'A能源站',
  //     url: '',
  //   },{
  //     id: '3',
  //     name: 'B能源站',
  //     url: '',
  //   },{
  //     id: '4',
  //     name: 'C能源站',
  //     url: '',
  //   }]
  //   setTagList(tagArr)
  // },[])

  // 切换标签
  // const onChange = (e: RadioChangeEvent) => {
  //   console.log('radio checked', e.target.value);
  //   let tmp = tagList.find( item => item.id === e.target.value)
  //   console.log('tagList ============ tmp');
  //   console.log(tmp);
    
  //   setCurrentValue(e.target.value);
  // };

  // 切换菜单
  const onClick = (id:string) => {
    setCurrentValue(id)
  };

  // 关闭菜单
  const onClose = (id:string) => {
    tagList.splice(tagList.findIndex(item => item.id === id), 1);
    // setTagList([...tagList]);
  };

  // 刷新页面内容

  // 全屏当前页面

  // 遍历当前标签模板
  const tagBtnList = () => {
    return tagList.map((item, index) => {
      let itemStyle = styles.tabItem;
      if (currentValue === item.id) {
        itemStyle = styles.active
      }
      return <li key={index} className={itemStyle} >
              <Space>
                <span onClick={()=>onClick(item.key)} >
                  {item.label}
                </span>
                <CloseOutlined onClick={() => onClose(item.key)} />
              </Space>
              
            </li>
      // return <Radio.Button key={index} style={{background: 'none', border: 'none',borderRight: '1px solid #056ce9'}} value={item.id}>{item.name}</Radio.Button>
    })
  }

  return (
    <Row wrap={false} className={styles.tabTools}>
      <Col flex="1" className={styles.tabList}>
        <span>{counter}</span>
        <ul>
          {tagBtnList()}
        </ul>
      </Col>
      <Col className={styles.headRight}>
        <Space>
          <Button
            type="text"
            style={{color: '#A5EAFF'}}
            size='small'
            icon={<RedoOutlined />}
            onClick={() => console.log('2')}
            >刷新</Button>
          <Button
            type="text"
            style={{color: '#A5EAFF'}}
            size='small'
            icon={<FullscreenOutlined />}
            onClick={() => console.log('2')}
            >全屏</Button>
        </Space>
      </Col>
    </Row>
  );
};
export default HeadTags;
