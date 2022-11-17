interface Props {
  onClose: Function; // 关闭按钮回调方法
  onSubmit: Function; // 提交按钮回调方法
  Type: string; // 传入的类型
}
import ModalFooter from '@/components/ModalFooter';
import ZKTable from '@/components/ZKTable';
import { getalarmNoticeList } from '@/services/Ralis/WarningList';
import { Button, Form, Input, Select, Space, Tag } from 'antd';
import { useRef, useState } from 'react';
import styles from './Inine.less';

const { Option } = Select;

const onChange = (value: string[]) => {
  console.log(value);
};

const Inline = (props: Props) => {
  const [form] = Form.useForm();
  const shareRef = useRef();
  const [tag, setTag] = useState<Array<string>>(['默认标题']);

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    props.onSubmit();
  };
  // 表格列字段
  const columns = [
    {
      title: '站点名称',
      dataIndex: 'reason',
      align: 'left',
    },
    {
      title: '所属系统',
      dataIndex: 'systemName',
    },
    {
      title: '创建人',
      dataIndex: 'siteName',
    },
    {
      title: '创建时间',
      dataIndex: 'siteProject',
    },
  ];

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
  // 高级搜索栏Form
  const advanceSearchForm = (
    <div className="zkSearchBox">
      <Form form={form}>
        <Space align="center">
          <Form.Item name="name">
            <Input placeholder="请输入站点名称" />
          </Form.Item>
          <Button type="primary" onClick={() => searchOper('submit')}>
            搜索
          </Button>
          <Button onClick={() => searchOper('reset')}>重置</Button>
        </Space>
      </Form>
    </div>
  );
  // 点击搜索、重置按钮
  const searchOper = (type: string) => {
    shareRef?.current?.clickSearchBtn(type);
  };
  //获得选择表格数据


  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{}}>
      <div className={styles.title}>{advanceSearchForm}</div>
      <div className={styles.center}>
        <Tag closable>{tag}</Tag>
      </div>

      <div
        className={'zkTableContent'}
        style={{ paddingLeft: '0px', paddingRight: '0px' }}
      >
        <ZKTable
          rowId={'businessAlarmRuleTempId'}
          btnList={[]}
          searchForm={form}
          tableColumns={columns}
          tableDataFun={getTableData}
          defaultFormItem={{
            name: 'hello',
            email: '1',
            phone: '2',
          }}
          clickOperBtn={(t: string, d: any) => {
            console.log(
              't：按钮的类型【add/edit/del/export】;\n d：选中行数据',
            );
            console.log(t, d);
            console.log('点击表格上方操作按钮回调');
          }}
          ref={shareRef}
        />
      </div>

      <ModalFooter
        cancelFun={() => {
          props.onClose();
        }}
      />
      {/* <Form.Item>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item> */}
    </Form>
  );
};

export default Inline;
