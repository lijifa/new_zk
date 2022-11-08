//消息通知
import ExportList from '@/components/FormList';
import { PageHeader } from '@/components/SubHeader';
import { Button, Radio, Select } from 'antd';
import React, { memo, useState } from 'react';
import styles from './index.less';

const { Option } = Select;

// 表格数据
const columns = [
  {
    title: '时间',
    dataIndex: 'name',
  },
  {
    title: '所属站点',
    dataIndex: 'gender',
  },
  {
    title: '室外温度(℃)',
    dataIndex: 'gender',
  },
  {
    title: '室外湿度(%)',
    dataIndex: 'gender',
  },

  {
    title: '电能耗(kW·h)',
    dataIndex: 'gender',
  },
  {
    title: '电费(元)',
    dataIndex: 'gender',
  },
  {
    title: '水能耗(m³)',
    dataIndex: 'gender',
  },
  {
    title: '水费(元)',
    dataIndex: 'gender',
  },
  {
    title: '天然气能耗(Nm³)',
    dataIndex: 'gender',
  },
  {
    title: '天然气费(元)',
    dataIndex: 'gender',
  },
];
const Notification = memo(() => {
  const [loading, setLoading] = useState(false);

  const data: any = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }

  const handleTableChange = (value: any, key: any) => {
    console.log(value, key);
  };
  const handleClick = (Listkey: any) => {
    console.log('点击:', Listkey);
  };
  return (
    <>
      <PageHeader title="消息通知" />
      <div className={styles.moduleContent}>
        <div className={styles.bars}>
          {/* <ul>
            <li>
              <span>全部通知 (999+)</span>
            </li>
            <li>
              <span>系统消息 (0)</span>
            </li>
            <li>
              <span>告警消息 (999+)</span>
            </li>
            <li>
              <span>为什么没有删除按钮 (999+)</span>
            </li>
          </ul> */}
          <Radio.Group defaultValue="a">
            <Radio.Button value="a">全部通知 (999+)</Radio.Button>
            <Radio.Button value="b">系统消息 (0)</Radio.Button>
            <Radio.Button value="c">告警消息 (999+)</Radio.Button>
            <Radio.Button value="d">为什么没有删除按钮 (999+)</Radio.Button>
          </Radio.Group>
        </div>
        <div className={styles.search}>
          <div className={styles.searchItem}>
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="选择已读未读"
              //  defaultValue="jack"
              optionFilterProp="children"
              filterOption={(input, option) =>
                (option!.children as unknown as string)
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            >
              <Option value="jack">选择已读未读</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="tom">Tom</Option>
            </Select>
          </div>

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
              marginLeft: '5px',
            }}
          >
            重置
          </Button>
        </div>
        <div className={styles.table}>
          <ExportList
            Loading={loading}
            onChange={handleTableChange}
            Data={data}
            Columns={columns}
            Scroll={{ y: 'calc(100vh - 400px)' }}
            onCilck={handleClick}
            TableBts={[
              { type: 'add', text: '新增' },
              { type: 'update', text: '修改' },
              { type: 'del', text: '删除' },
            ]}
          />
        </div>
      </div>
    </>
  );
});

export default Notification;
