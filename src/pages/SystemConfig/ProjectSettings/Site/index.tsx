import { RowOperBtn } from '@/components/OperationBtn';
import { PageHeader } from '@/components/SubHeader';
import ZKTable from '@/components/ZKTable';
import { getSiteList } from '@/services/SystemConfig/ProjectSetting/site';
import { useBoolean } from 'ahooks';
import { Button, Form, Input, Modal, Select, Space } from 'antd';
import { useRef, useState } from 'react';
import Add from './Add';
import Detailpage from './Detailpage'; //站点详情
import PersonDetail from './PersonDetail'; //人员详情

const Site = () => {
  const [form] = Form.useForm();
  const [state, { toggle }] = useBoolean(false);
  const shareRef = useRef();
  const [AddCgType, setAddCgType] = useState<string>(''); //判断添加，修改以及行内操作
  const [Id, setId] = useState<any>();
  const [newList, setNewList] = useState<any>();

  // 表格列字段
  const columns = [
    {
      title: '站点名称',
      dataIndex: 'name',
      align: 'left',
    },
    {
      title: '站点所在地',
      dataIndex: 'address',
    },
    {
      title: '站点人数',
      dataIndex: 'sitePeopleNummer',
    },
    {
      title: '所属项目',
      dataIndex: 'projectName',
    },
    {
      title: '所属系统',
      dataIndex: 'systemName',
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
    },
    {
      title: '创建时间',
      dataIndex: ['createTime'],
    },
    {
      title: '操作',
      key: 'operation',
      render: (record: any) => (
        <RowOperBtn
          btnList={[
            { key: 'detail', text: '人员详情' },
            { key: 'site', text: '站点详情' },
          ]}
          btnCilck={(e: string) => {
            clickRowbtn(e, record);
            toggle();
          }}
          rowData={record}
          // isDisabled={isDisabledFun(record)}
        />
      ),
    },
  ];
  // 获取表格数据
  const getTableData = (paramData: any) => {
    return getSiteList(paramData).then((res) => {
      if (res.code == 200) {
        return {
          total: res.data.total,
          list: res.data.list,
        };
      }
      return {
        total: 0,
        list: [],
      };
    });
  };

  // 过滤不可选择的行属性
  const isDisabledFun = (res: { gender: string }) => {
    return res.gender === 'female';
  };

  // 点击行内操作按钮回调
  const clickRowbtn = (e: string, data: any) => {
    console.log('e：按钮标识(key);\n data当前操作行数据');
    console.log(e);
    console.log(data);
    const id = data.id;
    setId(id);
    console.log(id);
    setAddCgType(e);
  };

  // 高级搜索栏Form
  const advanceSearchForm = (
    <div className="zkSearchBox">
      <Form form={form}>
        <Space align="center">
          <Form.Item name="name">
            <Input placeholder="请输入组态图名称搜索" />
          </Form.Item>

          <Form.Item name="email">
            <Select
              placeholder="请选择组态图类型"
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
                  label: '暖通系统',
                },
                {
                  value: '2',
                  label: '供配电系统',
                },
                {
                  value: '1',
                  label: '空调末端',
                },
                {
                  value: '2',
                  label: '综合系统',
                },
              ]}
            />
          </Form.Item>

          <Form.Item name="phone">
            <Select
              placeholder="请选择站点"
              showSearch
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
                  label: '暖通系统',
                },
                {
                  value: '2',
                  label: '供配电系统',
                },
                {
                  value: '3',
                  label: '空调末端',
                },
                {
                  value: '4',
                  label: '综合系统',
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

  // 点击搜索、重置按钮
  const searchOper = (type: string) => {
    shareRef?.current?.clickSearchBtn(type);
  };
  //根据Type显示不同页面
  const AddPage = (
    <Add
      type={AddCgType}
      id={Id}
      onSubmit={() => {
        toggle();
      }}
      onClose={() => {
        toggle();
      }}
    />
  );
  //判断页面
  function findMType(AddCgType: string) {
    let result;
    switch (AddCgType) {
      case 'add':
        result = AddPage;
        break;
      case 'edit':
        result = AddPage;
        break;
      case 'detail':
        result = (
          <PersonDetail
            onSubmit={() => {
              toggle();
            }}
            onClose={() => {
              toggle();
            }}
          />
        );
        break;
      case 'site':
        result = (
          <Detailpage
            id={Id}
            onSubmit={() => {
              toggle();
            }}
            onClose={() => {
              toggle();
            }}
          />
        );
        break;
      default:
        break;
    }
    return result;
  }
  //判断标头
  function findTitle(AddCgType: string) {
    let resule;
    switch (AddCgType) {
      case 'add':
        resule = '新增站点';
        break;
      case 'edit':
        resule = '修改站点';
        break;
      case 'detail':
        resule = '人员详情';
        break;
      case 'site':
        resule = '站点详情';
        break;
      default:
        break;
    }
    return resule;
  }

  return (
    <>
      <div>
        <PageHeader />
        <div className={'zkTableContent'}>
          {advanceSearchForm}

          <ZKTable
            rowId={'id'}
            btnList={['add', 'edit', 'del']}
            searchForm={form}
            tableColumns={columns}
            tableDataFun={getTableData}
            defaultFormItem={{}}
            clickOperBtn={(t: string, d: any) => {
              console.log(
                't：按钮的类型【add/edit/del/export】;\n d：选中行数据',
              );
              console.log(d, 'sssssss');
              console.log('点击表格上方操作按钮回调');
              toggle();
              setAddCgType(t);
              if (t === 'edit') {
                let id = d[0];
                setId(id);
              }
            }}
            ref={shareRef}
          />
        </div>
      </div>
      <Modal
        title={findTitle(AddCgType)}
        open={state}
        footer={null}
        destroyOnClose={true}
        centered={true}
        onCancel={toggle}
        width={AddCgType === 'site' ? 950 : 1300}
        bodyStyle={{ height: AddCgType === 'site' ? '600px' : '750px' }}
      >
        {findMType(AddCgType)}
      </Modal>
    </>
  );
};
export default Site;
