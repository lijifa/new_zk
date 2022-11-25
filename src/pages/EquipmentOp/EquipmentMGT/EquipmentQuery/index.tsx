import DelWarnModal from '@/components/DelWarnModal';
import { RowOperBtn } from '@/components/OperationBtn';
import { PageHeader } from '@/components/SubHeader';
import ZKTable from '@/components/ZKTable';
import { getalarmNoticeList } from '@/services/Ralis/WarningList';
import { history, useModel } from '@umijs/max';
import { Button, Form, Input, Select, Space, Tabs } from 'antd';
import React, { memo, useRef, useState } from 'react';
import styles from './index.less';

const EquipmentQuery = memo(() => {
  const [form] = Form.useForm();
  const shareRef = useRef<any>();
  const { addTagFun, tags } = useModel('menuModel');
  const [del, setDel] = useState(false);

  const TITLE_NAME = ['通用设备', '传感器', '监控摄像头', '末端设备'];

  // 获取表格数据
  const getTableData = (paramData: any) => {
    return getalarmNoticeList(paramData).then((data) => {
      if (data.code == 0) {
        return {
          total: data.total,
          list: data.rows,
        };
      }
      return {
        total: 0,
        list: [],
      };
    });
  };

  // 点击行内操作按钮回调
  const clickRowbtn = (e: string, data: any) => {
    switch (e) {
      case 'down':
        console.log('下载二维码');
        break;
      case 'detail':
        let tagsList = tags.filter(
          (res) => res.key === data.businessAlarmRuleTempId,
        );
        if (
          tagsList.length > 0 &&
          tagsList[0].key === data.businessAlarmRuleTempId
        ) {
          history.push(tagsList[0].path);
          return;
        }
        addTagFun(
          {
            key: data.businessAlarmRuleTempId,
            label: '设备详情',
            path: `/detailsPage${data.businessAlarmRuleTempId}`,
          },
          'table',
        );
        break;
      default:
        break;
    }
  };

  // 表格数据
  const columns = [
    {
      title: '设备编号',
      dataIndex: 'reason',
      width: 200,
    },
    {
      title: '设备名称',
      dataIndex: 'age',
    },
    {
      title: '设备种类',
      dataIndex: 'address',
    },
    {
      title: '一级分类',
      dataIndex: 'address',
    },
    {
      title: '二级分类',
      dataIndex: 'address',
    },
    {
      title: '所属系统',
      dataIndex: 'address',
    },
    {
      title: '所属站点',
      dataIndex: 'address',
    },
    {
      title: '使用状态',
      dataIndex: 'address',
    },
    {
      title: '创建时间',
      dataIndex: 'address',
    },
    {
      title: '操作',
      key: 'operation',
      align: 'center',
      width: 200,
      render: (record: any) => (
        <RowOperBtn
          btnList={[
            { key: 'down', text: '下载二维码' },
            { key: 'detail', text: '设备详情' },
          ]}
          btnCilck={(e: string) => {
            clickRowbtn(e, record);
          }}
          rowData={record}
          // isDisabled={isDisabledFun(record)}
        />
      ),
    },
  ];

  // 点击搜索、重置按钮
  const searchOper = (type: string) => {
    shareRef?.current?.clickSearchBtn(type);
  };

  // 高级搜索栏Form
  const advanceSearchForm = (
    <div className={'zkSearchBox'}>
      <Form form={form}>
        <Space align="center">
          <Form.Item name="username">
            <Input placeholder="请输入设备名称搜索" />
          </Form.Item>
          <Form.Item name="username">
            <Select
              placeholder="请选择设备种类"
              style={{ width: 200 }}
              optionFilterProp="label"
              filterOption={(input, option) =>
                (option?.label ?? '').includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={[
                {
                  value: '1',
                  label: '在职',
                },
                {
                  value: '2',
                  label: '离职',
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="username">
            <Select
              placeholder="请选择所属系统"
              style={{ width: 200 }}
              optionFilterProp="label"
              filterOption={(input, option) =>
                (option?.label ?? '').includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={[
                {
                  value: '1',
                  label: '在职',
                },
                {
                  value: '2',
                  label: '离职',
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="username">
            <Select
              placeholder="请选择二级分类"
              style={{ width: 200 }}
              optionFilterProp="label"
              filterOption={(input, option) =>
                (option?.label ?? '').includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={[
                {
                  value: '1',
                  label: '在职',
                },
                {
                  value: '2',
                  label: '离职',
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="username">
            <Select
              placeholder="请选择所属站点"
              style={{ width: 200 }}
              optionFilterProp="label"
              filterOption={(input, option) =>
                (option?.label ?? '').includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={[
                {
                  value: '1',
                  label: '在职',
                },
                {
                  value: '2',
                  label: '离职',
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="username">
            <Select
              placeholder="请选择使用状态"
              style={{ width: 200 }}
              optionFilterProp="label"
              filterOption={(input, option) =>
                (option?.label ?? '').includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={[
                {
                  value: '1',
                  label: '在职',
                },
                {
                  value: '2',
                  label: '离职',
                },
              ]}
            />
          </Form.Item>

          <Button type="primary" onClick={() => searchOper('submit')}>
            搜索
          </Button>
          <Button onClick={() => searchOper('reset')}>重置</Button>
        </Space>
      </Form>
    </div>
  );

  const items = TITLE_NAME.map((e, i) => {
    return {
      label: e,
      key: `${i}`,
      children: (
        <>
          <div className={'zkTableContent'}>
            {advanceSearchForm}

            <ZKTable
              btnList={['export']}
              searchForm={form}
              tableDataFun={getTableData}
              tableColumns={columns}
              ref={shareRef}
              clickOperBtn={(t: string, d: any) => {
                console.log('d:', d);
                if (t === 'del') {
                  setDel(true);
                }
              }}
            />
          </div>
        </>
      ),
    };
  });

  return (
    <>
      <div className={styles.content}>
        <PageHeader />
        <div className={'zkTableContent'}>
          <div className={styles.card_container}>
            <Tabs type="card" items={items} />
          </div>
        </div>
      </div>
      {/* 删除弹框 */}
      <DelWarnModal
        Show={del}
        Delete={() => {
          console.log('父级删除');
          setDel(false);
        }}
        Cancal={() => {
          console.log('父级取消');
          setDel(false);
        }}
      />
    </>
  );
});

export default EquipmentQuery;
