import DelWarnModal from '@/components/DelWarnModal';
import { PageHeader } from '@/components/SubHeader';
import ZKTable from '@/components/ZKTable';
import { getalarmNoticeList } from '@/services/Ralis/WarningList';
import { useBoolean } from 'ahooks';
import { Button, Form, Input, Modal, Space } from 'antd';
import { memo, useRef, useState } from 'react';
import Add from './Add';

const VulnerableList = memo(() => {
  const [form] = Form.useForm();
  const [state, { toggle }] = useBoolean(false);
  const [del, setDel] = useState(false);
  const shareRef = useRef<any>();
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

  // 表格数据
  const columns = [
    {
      title: '材料名称',
      dataIndex: 'reason',
    },
    {
      title: '型号',
      dataIndex: 'age',
    },
    {
      title: '单位',
      dataIndex: 'address',
    },
    {
      title: '品牌',
      dataIndex: 'address',
    },
    {
      title: '售后厂家',
      dataIndex: 'address',
    },
    {
      title: '创建人',
      dataIndex: 'address',
    },
    {
      title: '创建时间',
      dataIndex: 'address',
    },
  ];

  // 点击搜索、重置按钮
  const searchOper = (type: string) => {
    shareRef?.current?.clickSearchBtn(type);
  };

  // 高级搜索栏Form
  const advanceSearchForm = (
    <div className="zkSearchBox">
      <Form form={form}>
        <Space align="center">
          <Form.Item name="name">
            <Input placeholder="请输入材料名称搜索" />
          </Form.Item>

          <Button type="primary" onClick={() => searchOper('submit')}>
            搜索
          </Button>
          <Button onClick={() => searchOper('reset')}>重置</Button>
        </Space>
      </Form>
    </div>
  );

  return (
    <>
      <PageHeader />
      <div className={'zkTableContent'}>
        {advanceSearchForm}

        <ZKTable
          btnList={['add', 'edit', 'del']}
          searchForm={form}
          tableDataFun={getTableData}
          tableColumns={columns}
          ref={shareRef}
          rowId={'businessAlarmRuleTempId'}
          clickOperBtn={(t: string, d: any) => {
            if (t === 'add' || t === 'edit') {
              toggle();
            } else {
              setDel(true);
            }
          }}
        />
      </div>
      <Modal
        title="新增易损清单"
        open={state}
        footer={null}
        destroyOnClose={true}
        centered={true}
        onCancel={toggle}
        width={950}
        bodyStyle={{ height: '400px' }}
      >
        <Add
          onSubmit={() => {
            toggle();
          }}
          onClose={() => {
            toggle();
          }}
        />
      </Modal>
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

export default VulnerableList;
