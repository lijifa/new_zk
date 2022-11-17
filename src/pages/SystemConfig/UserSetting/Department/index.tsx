import DelWarnModal from '@/components/DelWarnModal';
import { RowOperBtn } from '@/components/OperationBtn';
import { PageHeader } from '@/components/SubHeader';
import ZKTable from '@/components/ZKTable';
import { getalarmNoticeList } from '@/services/Ralis/WarningList';
import { useBoolean } from 'ahooks';
import { Button, Form, Input, Modal, Space } from 'antd';
import { useRef, useState } from 'react';
import Add from './Add';
import styles from './index.less';

const UserCheck = () => {
  const [form] = Form.useForm();
  const [state, { toggle }] = useBoolean(false);
  const [del, setDel] = useState(false);
  const shareRef = useRef<any>();

  // 表格数据
  const columns = [
    {
      title: '部门名称',
      dataIndex: 'name',
    },
    {
      title: '显示顺序',
      dataIndex: 'age',
    },
    {
      title: '联系人姓名',
      dataIndex: 'address',
    },
    {
      title: '联系人电话',
      dataIndex: 'address',
    },
    {
      title: '创建时间',
      dataIndex: 'address',
    },
    {
      title: '操作',
      key: 'operation',
      render: (record: any) => (
        <RowOperBtn
          btnList={[
            { key: 'add', text: '新增' },
            { key: 'edit', text: '编辑' },
            { key: 'del', text: '删除' },
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

  // 点击行内操作按钮回调
  const clickRowbtn = (e: string, data: any) => {
    switch (e) {
      case 'add':
        toggle();
        break;
      case 'edit':
        toggle();
        break;
      case 'del':
        setDel(true);
        break;
      default:
        break;
    }
    console.log('e：按钮标识(key);\n data当前操作行数据');
    console.log(e);
    console.log(data);
  };

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

  // 点击搜索、重置按钮
  const searchOper = (type: string) => {
    shareRef?.current?.clickSearchBtn(type);
  };

  // 高级搜索栏Form
  const advanceSearchForm = (
    <div className="zkSearchBox">
      <Form form={form}>
        <Space align="center">
          <Form.Item name="username">
            <Input placeholder="请输入部门名称搜索" />
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
          btnList={['add']}
          searchForm={form}
          tableColumns={columns}
          tableDataFun={getTableData}
          clickOperBtn={(t: string, d: any) => {
            console.log(
              't：按钮的类型【add/edit/del/export】;\n d：选中行数据',
            );
            console.log(t, d);
            console.log('点击表格上方操作按钮回调');
            toggle();
          }}
          isRowCheck={false}
          otherBtnFun={(e: any) => {
            return [
              <Button
                key="other1"
                type="primary"
                onClick={() => {
                  console.log(e);
                }}
                style={{ background: '#23c6c8', border: '#23c6c8' }}
              >
                展开/折叠
              </Button>,
              <div className={styles.warnText} key={'warnText'}>
                注：请按照同一层级进行从小到大排序
              </div>,
            ];
          }}
          ref={shareRef}
        />
      </div>
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
      <Modal
        title="添加"
        open={state}
        footer={null}
        destroyOnClose={true}
        centered={true}
        onCancel={toggle}
        width={950}
        bodyStyle={{ height: '620px' }}
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
    </>
  );
};

export default UserCheck;
