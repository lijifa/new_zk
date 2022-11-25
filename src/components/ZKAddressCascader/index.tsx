/**
 * 所在地级联选择
 */

import { getCity, getCounty, getProvince } from '@/services/SystemConfig/ProjectSetting/site'
import { useMount } from 'ahooks'
import { Button, Cascader, CascaderProps } from 'antd'
import { isEmpty } from 'lodash'
import { forwardRef, useEffect, useState } from 'react'

type Option = {
  value: string
  label: string
  path: string
  level: 'province' | 'city' | 'county' 
  isLeaf?: boolean
  loading?: boolean
  children?: Option[]
}

// type ZKAddressCascaderProps = Omit<React.PropsWithChildren<CascaderProps<Option>>, 'options' | 'loadData'>
type ZKAddressCascaderProps = {
  data: string[]
  onChange: (value: string[], selectOptions: Option[]) => void
}
// forwardRef
const ZKAddressCascader: React.FC<ZKAddressCascaderProps> = ((props) => {

  const [value, setValue] = useState<string[]>(props.data ?? [])
  
  const [options, setOptions] = useState<Option[]>([])

  const loadData = (selectedOptions: Option[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1]
    switch (targetOption.level) {
      case 'province':
        setCityOptions(targetOption)
        break
      case 'city':
        setCountyOptions(targetOption)
        break
    }
  }

  async function setCountyOptions(cityOption: Option) {
    cityOption.loading = true
    const res = await getCounty(+cityOption.value).finally(() => cityOption.loading = false)
    if (res.code === '200') {
      cityOption.children = formatOptions(res.data ?? [], 'county', cityOption.path)
      console.log(options)
      setOptions([...options])
    }
  }

  async function setCityOptions(provinceOption: Option) {
    provinceOption.loading = true
    const res = await getCity(+provinceOption.value).finally(() => provinceOption.loading = false)
    if (res.code === '200') {
      provinceOption.children = formatOptions(res.data ?? [], 'city', provinceOption.path)
      setOptions([...options])
    }
  }

  async function setProvinceOptions() {
    const res = await getProvince()
    if (res.code === '200') {
      setOptions(formatOptions(res.data ?? [], 'province'))
    }
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

  /* async function formatOptions() {
  } */

  useEffect(() => {
    setValue(props.data ?? [])
  }, [props.data])

  useMount(async () => {
    await setProvinceOptions()
    if (value.length > 1) {
      const provinceOption = options.find(({ value: val }) => val === value[0])
      if (provinceOption) {
        await setCityOptions(provinceOption)
      }
      if (value.length > 2 && !isEmpty(provinceOption?.children)) {
        const cityOption = provinceOption!.children!.find(({ value: val }) => val === value[2])
        if (cityOption) {
          await setCountyOptions(cityOption)
        }
      }
    }
  })

  return <>
    <Cascader
      options={options}
      loadData={loadData as any}
      value={value}
      onChange={
        (value: any, selectedOptions: any) => {
          setValue(value)
          props.onChange(value, selectedOptions)
        }
      }
    />
  </>
})

export default ZKAddressCascader
