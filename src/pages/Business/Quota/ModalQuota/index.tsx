import ModalFooter from '@/components/ModalFooter'
import { useMount, useUnmount } from 'ahooks'
import { Col, Form, FormInstance, InputNumber, Row, Select, Table, Tabs } from 'antd'
import { TableProps } from 'antd/es/table'
import { ColumnsType } from 'antd/lib/table'
import dayjs from 'dayjs'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { initDataSourceQuota, monthColumns } from '../helper'
import { QuotaRecord } from '../typings'
import { ModalProps } from '../../../../hooks/useDialog'
import Styles from './index.less'


const EditableContext = React.createContext<FormInstance<any> | null>(null)

interface EditableRowMonthProps {
  index: number
}

const EditableRowMonth: React.FC<EditableRowMonthProps> = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

interface EditableCellMonthProps {
  title: React.ReactNode
  editable: boolean
  children: React.ReactNode
  dataIndex: keyof QuotaRecord
  record: QuotaRecord
  period: {
    pyear: string
    cyear: string
    cmonth: string
  }
  handleSave: (record: QuotaRecord) => void
}

const EditableCellMonth: React.FC<EditableCellMonthProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  period,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false)
  // const inputRef = useRef<InputRef>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const form = useContext(EditableContext)!
  
  useEffect(() => {
    if (editing) {
      inputRef.current!.focus();
    }
  }, [editing])

  const toggleEdit = () => {
    if (isEditableCell()) {
      setEditing(!editing)
      form.setFieldsValue({ [dataIndex]: record[dataIndex] })
    }
  }

  const save = async () => {
    try {
      const values = await form.validateFields()
      toggleEdit()
      handleSave({ ...record, ...values })
    } catch (errInfo) {
      console.warn('Save failed:', errInfo);
    }
  }

  function isEditableCell() {
    if (period && record.type === 'month') {
      const { pyear, cyear, cmonth } = period
      if (pyear === cyear) {
        const dataIndexMonth = +(dataIndex as string).slice(5) + record.half * 6
        if (dataIndexMonth > +cmonth) {
          return true
        }
      } else {
        return true
      }
    }
    return false
  }

  let childNode = children

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{ margin: 0 }}
        name={dataIndex}
        /* rules={[
          {
            required: true,
            message: `${title} is required.`,
          },
        ]} */
      >
        <InputNumber
          ref={inputRef}
          style={{ width: '99%' }}
          max={99999999}
          min={0}
          onPressEnter={save}
          onBlur={save}
        />
      </Form.Item>
    ) : (
      <div
        className={
          [
            Styles['cell-value-wrap'],
            isEditableCell() ? Styles['editable'] : ''
          ].join(' ')
        }
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>
}

/**
 * ????????????/????????????/??????????????????-??????
 */
const QuotaModal: React.FC<ModalProps> = (props) => {

  const [curYear, curMonth] = dayjs().format('YYYY-M').split('-')

  /** ??????-?????? */
  const [periodYear, setPeriodYear] = useState(curYear)
  
  const [form] = Form.useForm()

  const [gridDataSourceQuota, setGridDataSourceQuota] = useState(() => initDataSourceQuota([[1, 2], [1, 2]]))

  const gridColumnsQuota: ColumnsType<QuotaRecord> = monthColumns[0].map((column, index) => (
    !index
    ? {
      dataIndex: 'title',
      width: '22%'
    }
    : {
      dataIndex: 'value' + index,
      width: '13%',
      onCell(record, i) {
        return {
          index: i,
          record,
          period: {
            cyear: curYear,
            cmonth: curMonth,
            pyear: periodYear
          },
          editable: true,
          dataIndex: 'value' + index,
          title: column,
          handleSave(record: QuotaRecord) {
            const indexSaved = gridDataSourceQuota.findIndex((item) => item.key === record.key)
            gridDataSourceQuota[indexSaved] = {
              ...gridDataSourceQuota[indexSaved],
              ...record
            }
            setGridDataSourceQuota([...gridDataSourceQuota])
          }
        }
      }
    }
  ))

  const gridQuota: TableProps<QuotaRecord> = {
    components: {
      body: {
        row: EditableRowMonth,
        cell: EditableCellMonth,
      }
    },
    rowKey: 'key',
    showHeader: false,
    bordered: true,
    pagination: false,
    rowClassName: (record) => record.type === 'title' ? Styles['title-row'] : Styles['editable-row'],
    columns: gridColumnsQuota,
    dataSource: gridDataSourceQuota
  }

  useMount(() => {
    console.log('useMount')
    console.log(gridQuota.dataSource)
    console.log(gridQuota.columns)
  })

  useUnmount(() => {
    console.log('useUnmount')
  })

  return (
    <>
      <Form form={form} layout='vertical'>
        <Row gutter={16}>
          {/* ???????????? */}
          <Col span={12}>
            <Form.Item label="????????????:">
              <Select placeholder='?????????????????????' options={[]} />
            </Form.Item>
          </Col>
          {/* ???????????? */}
          <Col span={12}>
            <Form.Item label="????????????:">
              <Select placeholder='?????????????????????' options={[]} />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          {/* ???????????? */}
          <Col span={12}>
            <Form.Item label="????????????:">
              <Select placeholder='?????????????????????' options={[]} />
            </Form.Item>
          </Col>
          {/* ???????????? */}
          <Col span={12}>
            <Form.Item label="????????????:">
              <Select placeholder='?????????????????????' options={[]} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="?????????????????????????????????????????????????????????0?????????????????????1?????????????????????????????????m????????">
          {/* ??????-?????? */}
          <div className={Styles.period}>
            <Tabs
              type='card'
              activeKey={periodYear}
              items={[curYear, `${+curYear + 1}`].map((year) => ({ label: year + '???', key: year }))}
              onChange={(activeKey) => setPeriodYear(activeKey)}
            />  
          </div>
          {/* ??????-?????? */}
          <Table {...gridQuota} />
        </Form.Item>
      </Form>
      {/* ????????? */}
      <ModalFooter cancelFun={() => props.cancel!()} okFun={() => props.ok!()} />
    </>
  )
}

export default QuotaModal
