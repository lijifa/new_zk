/**
 * 所在地级联选择
 */

import { getCity, getCounty, getProvince } from '@/services/SystemConfig/ProjectSetting/site'
import { useMount } from 'ahooks'
import { Cascader } from 'antd'
import { isEmpty, isNil } from 'lodash'
import { useEffect, useState } from 'react'


type Option = {
  value: string
  label: string
  path: string
  level: 'province' | 'city' | 'county' 
  isLeaf?: boolean
  loading?: boolean
  children?: Option[]
}


/**
 * 所在地（省/市/县区）联动选择器
 */
type ZKAddressCascaderProps = {
  data: string[]
  onChange: (value: string[], selectOptions: Option[]) => void
  placeholder?: React.ReactNode
}
// forwardRef
const ZKAddressCascader: React.FC<ZKAddressCascaderProps> = ((props) => {

  const [loading, setLoading] = useState(false)
  const [value, setValue] = useState<string[]>(props.data ?? [])
  
  const [options, setOptions] = useState<Option[]>([])

  const loadData = (selectedOptions: Option[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    switch (targetOption.level) {
      case 'province':
        if (isNil(targetOption.children)) {
          getCityOptions(targetOption).finally(() => setOptions([...options]))
        }
        break
      case 'city':
        if (isNil(targetOption.children)) {
          getCountyOptions(targetOption).finally(() => setOptions([...options]))
        }
        break
    }
  }

  async function getCountyOptions(cityOption: Option) {
    cityOption.loading = true
    const res = await getCounty(+cityOption.value).finally(() => cityOption.loading = false)
    if (res.code === '200') {
      return cityOption.children = formatOptions(res.data ?? [], 'county', cityOption.path)
    }
    return []
  }

  async function getCityOptions(provinceOption: Option) {
    provinceOption.loading = true
    const res = await getCity(+provinceOption.value).finally(() => provinceOption.loading = false)
    if (res.code === '200') {
      return provinceOption.children = formatOptions(res.data ?? [], 'city', provinceOption.path)
    }
    return []
  }

  async function getProvinceOptions() {
    const res = await getProvince()
    if (res.code === '200') {
      return formatOptions(res.data ?? [], 'province')
    }
    return []
  }

  async function renewOptions() {
    const [province, city, county] = props.data
    let optionList: Option[] = options
    if (isEmpty(options)) {
      optionList = await getProvinceOptions()
    }
    // 省
    if (province) {
      const provinceOption = optionList.find(({ value }) => value === province)
      // 市
      if (provinceOption && city) {
        let cityOptions: Option[] = []
        if (isNil(provinceOption.children)) {
          cityOptions = await getCityOptions(provinceOption)
        }
        const cityOption = cityOptions.find(({ value }) => value === city)
        // 县
        if (cityOption && county) {
          if (isNil(cityOption.children)) {
            await getCountyOptions(cityOption)
          }
        }
      }
    }
    setOptions([...optionList])
  }

  function formatOptions(data: any[], level: Option['level'], basepath = '') {
    return (
      (data ?? []).map(
        (item) => {
          const value = item[level + 'Id'] + ''
          return {
            value,
            label: item.name,
            level: level,
            isLeaf: level === 'county' ? true : false,
            path: [basepath, value].filter(Boolean).join('_')
          }
        }
      )
    )
  }

  useEffect(() => {
    setValue(props.data ?? [])
  }, [props.data])

  useMount(() => {
    setLoading(true)
    renewOptions().finally(() => setLoading(false))
  })

  return (
    <Cascader
      loading={loading}
      options={options}
      loadData={loadData as any}
      value={value}
      placeholder={props.placeholder}
      onChange={
        (value: any, selectedOptions: any) => {
          setValue(value)
          props.onChange(value, selectedOptions)
        }
      }
    />
  )
})

export default ZKAddressCascader
