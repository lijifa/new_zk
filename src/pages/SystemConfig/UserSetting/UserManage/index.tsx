import { RowOperBtn } from '@/components/OperationBtn';
import { PageHeader } from '@/components/SubHeader';
import ZKTable from '@/components/ZKTable';
import { DownOutlined, RedoOutlined, UpOutlined } from '@ant-design/icons';
import { useBoolean } from 'ahooks';
import { Button, Form, Input, Select, Space, Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import { useRef, useState } from 'react';
import styles from './index.less';

const { DirectoryTree } = Tree;

const treeData: DataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'leaf',
        key: '1',
        isLeaf: true,
      },
      {
        title: 'leaf',
        key: '2',
        isLeaf: true,
      },
      {
        title: 'leaf',
        key: '3',
        isLeaf: true,
      },
    ],
  },
];

const UserManage = () => {
  const [form] = Form.useForm();
  const [state, { toggle }] = useBoolean(false);
  const shareRef = useRef<any>();
  const [treeIcon, setTreeIcon] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>(['0-0']);

  // 表格数据
  const columns = [
    {
      title: '用户名',
      dataIndex: 'name',
    },
    {
      title: '真实姓名',
      dataIndex: 'age',
    },
    {
      title: '手机号',
      dataIndex: 'address',
    },
    {
      title: '角色',
      dataIndex: '',
    },
    {
      title: '所属部门',
      dataIndex: '',
    },
    {
      title: '所属岗位',
      dataIndex: '',
    },
    {
      title: '在职/离职',
      dataIndex: '',
    },
    {
      title: '入职日期',
      dataIndex: '',
    },
    {
      title: '离职日期',
      dataIndex: '',
    },
    {
      title: '操作',
      key: 'operation',
      render: (record: any) => (
        <RowOperBtn
          btnList={[
            { key: 'copy', text: '复制该组态图' },
            { key: 'detail', text: '组态图详情' },
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

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
  };

  // 点击行内操作按钮回调
  const clickRowbtn = (e: string, data: any) => {
    console.log('e：按钮标识(key);\n data当前操作行数据');
    console.log(e);
    console.log(data);
  };

  // 展开/收起节点时触发
  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand:', expandedKeysValue);
    setExpandedKeys(expandedKeysValue);
  };

  // 点击刷新
  const Refrish = () => {
    console.log('点击刷新');
  };

  // 高级搜索栏Form
  const advanceSearchForm = (
    <div className="zkSearchBox">
      <Form form={form}>
        <Space align="center">
          <Form.Item name="username">
            <Input placeholder="请输入真实姓名搜索" />
          </Form.Item>
          <Form.Item name="name">
            <Input placeholder="请输入用户名搜索" />
          </Form.Item>
          <Form.Item name="phone">
            <Input placeholder="请输入手机号搜索" />
          </Form.Item>

          <Form.Item name="email">
            <Select
              placeholder="选择在职/离职"
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

  // 点击展开/收回
  const ToggleTree = () => {
    setTreeIcon(!treeIcon);
    setExpandedKeys(treeIcon ? ['0-0'] : []);
  };

  // 点击搜索、重置按钮
  const searchOper = (type: string) => {
    shareRef?.current?.clickSearchBtn(type);
  };

  return (
    <>
      <PageHeader />
      <div className={styles.content}>
        <div className={styles.TreeBox}>
          <div className={styles.Treetitle}>
            <span>部门信息</span>
            <div>
              <Button
                type="link"
                icon={treeIcon ? <UpOutlined /> : <DownOutlined />}
                onClick={() => ToggleTree()}
              />
              <Button
                type="link"
                icon={<RedoOutlined />}
                onClick={() => Refrish()}
              />
            </div>
          </div>
          <DirectoryTree
            multiple
            className={styles.tree}
            onSelect={onSelect}
            treeData={treeData}
            onExpand={onExpand}
            expandedKeys={expandedKeys}
          />
        </div>
        <div style={{ flex: 1, width: 200 }}>
          <div className={styles.container}>
            <div className={'zkTableContent'}>
              {advanceSearchForm}

              <ZKTable
                btnList={[]}
                searchForm={form}
                tableColumns={columns}
                clickOperBtn={(t: string, d: any) => {
                  console.log(
                    't：按钮的类型【add/edit/del/export】;\n d：选中行数据',
                  );
                  console.log(t, d);
                  console.log('点击表格上方操作按钮回调');
                  toggle();
                }}
                isRowCheck={false}
                // checkboxType="radio"
                // disabledFun={(res: { gender: string }) => {
                //   return {
                //     disabled: isDisabledFun(res), // 过滤不可选择的行属性
                //     // name: record.gender,
                //   };
                // }}
                // otherBtnFun={(e: any) => {
                //   return [
                //     <Button
                //       key="other1"
                //       type="primary"
                //       onClick={() => {
                //         console.log(e);
                //       }}
                //       disabled={!(e.length === 1)}
                //     >
                //       其他
                //     </Button>,
                //   ];
                // }}
                ref={shareRef}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserManage;
