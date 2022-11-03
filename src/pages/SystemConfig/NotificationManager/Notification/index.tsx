//消息通知
import { PageHeader } from '@/components/SubHeader';
import { Select ,Button} from 'antd';
import React, { memo } from 'react';
import styles from './index.less';

const { Option } = Select;


const Notification = memo(() => {
  return (
    <>
      <PageHeader title="消息通知" />
      <div className={styles.moduleContent}>
        <div className={styles.bars}>
          <ul>
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
          </ul>
        </div>
        <div className={styles.search}>
          <div className={styles.searchItem}>
          <Select
            showSearch
            style={{width:'100%'}}
            placeholder='选择已读未读'
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
        <div className={styles.table}></div>
      </div>
    </>
  );
});

export default Notification;
