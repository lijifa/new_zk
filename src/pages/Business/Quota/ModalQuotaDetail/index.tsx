import React, { useState } from 'react'
import { Descriptions, Form, Table, TableProps, Tabs } from 'antd'
import { ModalProps } from '../../../../hooks/useDialog'
import Styles from './index.less'
import dayjs from 'dayjs'
import { ColumnsType, ColumnType } from 'antd/lib/table'
import { initDataSourceQuota, monthColumns } from '../helper'


type QuotaRecord = {
  key: React.Key
  type: 'title' | 'month' | 'money'
  title: string
  half: 0 | 1
  
  value1: string | number
  value2: string | number
  value3: string | number
  value4: string | number
  value5: string | number
  value6: string | number
}


/**
 * 碳控策略/能源计划/能源指标录入/弹窗-能源详情
 */
const PriceDetailModal: React.FC<ModalProps> = () => {

  const [curYear, curMonth] = dayjs().format('YYYY-M').split('-')

  /** 期间-年份 */
  const [periodYear, setPeriodYear] = useState(curYear)

  /** 详情-列表-数据源 */
  const [gridDataSourceQuota, setGridDataSourceQuota] = useState<QuotaRecord[]>(() => initDataSourceQuota([[1, 2, 3], [1, 2, 3]]))

  /** 详情-列表-列 */
  const grodColumnsQuota: ColumnsType<QuotaRecord> = monthColumns[0].map((column, index) => (
    !index
    ? {
      dataIndex: 'title',
      width: '22%'
    }
    : {
      dataIndex: 'value' + index,
      width: '13%'
    }
  ))

  /** 详情-列表 */
  const gridQuota: TableProps<QuotaRecord> = {
    showHeader: false,
    bordered: true,
    pagination: false,
    columns: grodColumnsQuota,
    dataSource: gridDataSourceQuota,
    rowClassName: (record) => record.type === 'title' ? Styles['title-row'] : '',
  }

  return (
    <>
      {/* 详情-信息 */}
      <Descriptions column={2} bordered>
        <Descriptions.Item label='所属项目:'>天津轨道集团光合谷园</Descriptions.Item>
        <Descriptions.Item label='所属系统:'>暖通系统</Descriptions.Item>
        <Descriptions.Item label='能源形势:'>燃气</Descriptions.Item>
        <Descriptions.Item label='2022年能耗指标:'>431.00 Nm³</Descriptions.Item>
        <Descriptions.Item label='所属站点:'>光合谷B能源站</Descriptions.Item>
        <Descriptions.Item label='2022年费用指标:'>0.00 万元</Descriptions.Item>
      </Descriptions>
      {/* 详情-列表 */}
      <Form layout='vertical' className={Styles['grid']}>
        <Form.Item label="月度能耗指标：">
          {/* 期间-年份 */}
          <div className={Styles['period']}>
            <Tabs
              type='card'
              activeKey={periodYear}
              items={[curYear, `${+curYear + 1}`].map((year) => ({ label: year + '年', key: year }))}
              onChange={(activeKey) => setPeriodYear(activeKey)}
            />
          </div>
          {/* 列表-月份 */}
          <Table {...gridQuota} />
        </Form.Item>
      </Form>
    </>
  )
}

export default PriceDetailModal
