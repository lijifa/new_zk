import { PageHeader } from '@/components/SubHeader'
import { Radio, Tabs } from 'antd'
import React, { useState } from 'react'
import Style from './index.less'


/**
 * 碳控策略/运行策略/基本控制
 */
const BaseControl: React.FC = () => {

  /** 工具栏-控制类型 */
  const [controlType, setControlType] = useState('remote')
  /** 控制栏 */
  const [control, setControl] = useState('0')

  return <div className={Style['page']}>
    {/* 标题 */}
    <PageHeader title='基本控制' />
    <div className={Style['page-body']}>
      {/* 工具栏 */}
      <div className={Style['action-bar']}>
        {/* 工具栏-控制类型 */}
        <Radio.Group
          value={controlType}
          options={[
            { label: '远程', value: 'remote' },
            { label: '本地', value: 'local' }
          ]}
          onChange={(e) => setControlType(e.target.value)}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
      {/* 控制栏 */}
      <Tabs
        type='card'
        activeKey={control}
        items={
          ['阀门控制', '冷冻泵控制', '冷却泵控制', '冷却塔控制'].map((label, key) => ({ label, key: key + '' }))
        }
        onChange={(activeKey) => setControl(activeKey)}
      />
      {/* 控制区 */}
      <div className={Style['page-body']}></div>
    </div>
  </div>
}

export default BaseControl
