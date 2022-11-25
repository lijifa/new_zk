import { RowOperBtn } from '@/components/OperationBtn';
import { PageHeader } from '@/components/SubHeader';
import ZKTable from '@/components/ZKTable';
import {
  getBelongProject,
  getProjectList,
} from '@/services/SystemConfig/ProjectSetting/project';
import { useBoolean } from 'ahooks';
import { Button, DatePicker, Form, Input, Modal, Select, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';
import Add from './Add/Add';
import DeletePage from './DeletePage';
import ProjectDetail from './ProjectDetail';
import Inline from './SiteBinding/SiteBinding';

const { RangePicker } = DatePicker;

const Project = () => {
  const [form] = Form.useForm();
  const [state, { toggle }] = useBoolean(false);
  const shareRef = useRef();
  const [AddCgType, setAddCgType] = useState<string>(''); //判断添加，修改以及行内操作
  const [Id, setId] = useState<any>();
  const [del, setDel] = useState(false);
  const [projectType, setProjectType] = useState<
    { label: string; value: string }[]
  >([]);
  useEffect(() => {
    getBelongProject({}).then((res) => {
      let projectTypeData = res.data.map((item: any) => ({
        label: item.name,
        value: item.id.toString(),
      }));
      setProjectType(projectTypeData);
    });
  }, []);

  // 表格列字段
  const columns = [
    {
      title: '项目名称',
      dataIndex: 'name',
      align: 'left',
      width:200
    },
    {
      title: '站项目所在地',
      dataIndex: 'address',
      align:'left'
    },
    {
      title: '项目类型',
      dataIndex: 'projectTypeName',
      align:'left',
      width:180,
    },
    {
      title: '项目总面积(万m³)',
      dataIndex: 'area',
      align:'left',
      width:180,
    },
    {
      title: '项目总金额(元)',
      dataIndex: 'sumMoney',
      width:220,
      align:'left'
      
    },
    {
      title: '项目人数',
      dataIndex: '0',
      width:170,
      render: (_, record: any) => <span>{0}</span>,
      align:'left'
    },
    {
      title: '操作',
      key: 'operation',
      width: '18%',
      align:'left',
      render: (record: any) => (
        <RowOperBtn
          btnList={[
            { key: 'detail', text: '绑定站点' },
            { key: 'site', text: '人员详情' },
            { key: 'project', text: '项目详情' },
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
    return getProjectList(paramData).then((res) => {
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
    setAddCgType(e);
  };
  // 高级搜索栏Form
  const advanceSearchForm = (
    <div className="zkSearchBox">
      <Form form={form}>
        <Space align="center">
          <Form.Item name="name">
            <Input placeholder="请输入项目名称搜索" />
          </Form.Item>

          <Form.Item name="projectTypeId">
            <Select
              placeholder="请选择项目类型"
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
              options={projectType}
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

  //判断类型
  //根据Type显示不同页面
  const AddPage = (
    <Add
      searchOper={searchOper}
      projectType={projectType}
      type={AddCgType}
      id={Id}
      onSubmit={() => {
        toggle();
        if (AddCgType === 'edit') {
          shareRef?.current?.changeRowCheckBox([]);
          shareRef?.current?.clickSearchBtn('reset');
        }
      }}
      onClose={() => {
        toggle();
      }}
    />
  );
  const InlinePage = (
    <Inline
      id={Id}
      Type={AddCgType}
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
        result = InlinePage;
        break;
      case 'site':
        result = InlinePage;
        break;
      case 'project':
        result = (
          <ProjectDetail
            id={Id}
            onSubmit={() => {
              toggle();
            }}
            onClose={() => {
              toggle();
            }}
          />
        );
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
        resule = '新增项目';
        break;
      case 'edit':
        resule = '修改项目';
        break;
      case 'detail':
        resule = '绑定站点';
        break;
      case 'site':
        resule = '人员详情';
        break;
      case 'project':
        resule = '项目详情';
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
            defaultFormItem={
              {
                // name: 'hello',
                // email: '1',
              }
            }
            clickOperBtn={(t: string, d: any) => {
              console.log(
                't：按钮的类型【add/edit/del/export】;\n d：选中行数据',
              );
              console.log(t, d);
              console.log('点击表格上方操作按钮回调');
              setAddCgType(t);
              if (t === 'del') {
                setDel(true);
                let id = d[0];
                setId(id);
              } else {
                toggle();
              }
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
        width={1300}
        bodyStyle={{
          overflowY: 'auto',
          height: '750px',
          padding: AddCgType === 'project' ? '20px 40px 20px 40px' : '',
        }}
      >
        {findMType(AddCgType)}
      </Modal>
      <DeletePage
        Show={del}
        id={Id}
        Delete={() => {
          setDel(false);
          shareRef?.current?.clickSearchBtn('reset');
        }}
        Cancal={() => {
          setDel(false);
        }}
      />
    </>
  );
};
export default Project;
