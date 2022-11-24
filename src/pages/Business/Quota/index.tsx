import { RowOperBtn } from '@/components/OperationBtn'
import { PageHeader } from '@/components/SubHeader'
import ZKTable from '@/components/ZKTable'
import { openDialog, useDialog } from '@/hooks'
import { Button, Form, Modal, Select, Space } from 'antd'
import React, { useRef } from 'react'
import { MODAL_PROPS } from './helper'
import QuotaModal from './ModalQuota'
import QuotaDetailModal from './ModalQuotaDetail'


/**
 * 碳控策略/能源计划/能源指标录入
 */
const Quota: React.FC = () => {

  /** 弹框-能源指标录入 */
  const dialogQuota = useDialog()

  /** 弹框-能源详情 */
  const dialogQuotaDetail = useDialog()

  /** 高级搜索栏-表单 */
  const [searchForm] = Form.useForm()

  /** 列表 */
  const grid = {
    btnList: ['add', 'edit', 'del'],
    searchForm,
    tableColumns: [
      {
        title: '能源形势',
        // dataIndex: 'siteProject',
      },
      {
        title: '2022年能耗指标',
      },
      {
        title: '能耗单位',
      },
      {
        title: '2022年费用指标（万元）',
      },
      {
        title: '所属项目',
      },
      {
        title: '所属站点',
      },
      {
        title: '所属系统',
      },
      {
        title: '操作',
        key: 'operation',
        render: (record: any) => (
          /* 列表按钮-能源详情 */
          <RowOperBtn
            btnList={[{ key: 'detail', text: '能源详情' }]}
            btnCilck={() => {
              openDialog(dialogQuotaDetail)
            }}
          />
        )
      },
    ],
    clickOperBtn(type: string, records: any[]) {
      switch (type) {
        /* 列表按钮-新增 */
        case 'add': {
          openDialog(dialogQuota, {
            title: '新增能源指标',
            ok() {
              dialogQuota.visible = false
            }
          })
          console.log(dialogQuota)
          break
        }
      }
    },
    tableDataFun(paramData: any) {
      console.log(paramData)
      return {
        total: 1,
        list: [{}],
      }
    }
  }
  const gridRef = useRef()

  return (
    <>
      <div>
        {/* 标题 */}
        <PageHeader title='能源指标录入' />
        <div className='zkTableContent'>
          {/* 高级搜索栏 */}
          <div className="zkSearchBox">
            <Form form={searchForm}>
              <Space align="center">
                {/* 能源形式 */}
                <Form.Item className='w-220'>
                  <Select placeholder='请选择能源形式' options={[]} />
                </Form.Item>
                {/* 所属项目 */}
                <Form.Item className='w-220'>
                  <Select placeholder='请选择所属项目' options={[]} />
                </Form.Item>
                {/* 所属系统 */}
                <Form.Item className='w-220'>
                  <Select placeholder='请选择所属系统' options={[]} />
                </Form.Item>
                {/* 所属站点 */}
                <Form.Item className='w-220'>
                  <Select placeholder='请选择所属站点' options={[]} />
                </Form.Item>
                {/* 高级搜索栏按钮-搜索 */}
                <Button type='primary'>搜索</Button>
                {/* 高级搜索栏按钮-重置 */}
                <Button>重置</Button>
              </Space>
            </Form>
          </div>
          {/* 列表 */}
          <ZKTable ref={gridRef} {...grid} />
        </div>
        {/* 弹框-能源指标录入 */}
        <Modal
          title={dialogQuota.title}
          open={dialogQuota.visible}
          onCancel={()=>dialogQuota.cancel()}
          {...MODAL_PROPS}
          width={950}
          bodyStyle={{ height: '540px' }}
        >
          <QuotaModal
            ok={() => dialogQuota.ok!()}
            cancel={() => dialogQuota.cancel!()}
          />
        </Modal>
        {/* 弹框-能源详情 */}
        <Modal
          title='能源详情'
          open={dialogQuotaDetail.visible}
          onCancel={() => dialogQuotaDetail.cancel()}
          {...MODAL_PROPS}
          width={950}
          bodyStyle={{ height: '600px' }}
        >
          <QuotaDetailModal
            ok={() => dialogQuotaDetail.ok!()}
            cancel={() => dialogQuotaDetail.cancel!()}
          />
        </Modal>
      </div>
    </>
  )
}

export default Quota
