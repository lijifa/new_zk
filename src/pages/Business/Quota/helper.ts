import { ModalProps } from 'antd';
import { QuotaRecord } from './typings';

export const MODAL_PROPS: ModalProps = {
  footer: null,
  destroyOnClose: true,
  centered: true,
}

export const monthColumns = [
  ['月份', '一月', '二月', '三月', '四月', '五月', '六月'],
  ['月份', '七月', '八月', '九月', '十月', '十一月', '十二月']
]

export function initDataSourceQuota(keys: number[][]) {
  let keyIndex = 1
  return keys.flatMap((values, vindex) => (
    values.map((value, index) => {
      const record = {
        key: keyIndex++,
        title: ['月份', '月能耗指标', '费用（万元）'][index],
        type: ['title', 'month', 'money'][index] as QuotaRecord['type'],
        half: vindex as QuotaRecord['half']
      } as QuotaRecord
      if (!index) {
        monthColumns[vindex].forEach((column, i) => {
          if (i) {
            (record as any)['value' + i] = column
          }
        })
      } else {
        record.value1 = 0
        record.value2 = 0
        record.value3 = 0
        record.value4 = 0
        record.value5 = 0
        record.value6 = 0
      }
      return record
    })
  ))
}


