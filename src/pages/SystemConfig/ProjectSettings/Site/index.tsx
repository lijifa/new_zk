import { RowOperBtn } from '@/components/OperationBtn';
import { PageHeader } from '@/components/SubHeader';
import ZKTable from '@/components/ZKTable';
import {
  getBelongProject,
  getBelongSystem,
  getSiteList,
} from '@/services/SystemConfig/ProjectSetting/site';
import { useBoolean } from 'ahooks';
import { Button, Form, Input, Modal, Select, Space } from 'antd';
import { useEffect, useRef, useState } from 'react';
import Add from './ADD/Add';
import DeletePage from './DeletePage';
import Detailpage from './Detailpage/Detailpage'; //站点详情
import PersonDetail from './PersonDetail/PersonDetail'; //人员详情

const Site = () => {
  const [form] = Form.useForm();
  const [state, { toggle }] = useBoolean(false);
  const shareRef = useRef();
  const [AddCgType, setAddCgType] = useState<string>(''); //判断添加，修改以及行内操作
  const [Id, setId] = useState<any>();
  const [List, setList] = useState<any>(); //请求表格数据
  const [del, setDel] = useState(false);
  const [project, setProject] = useState<{ label: string; value: string }[]>(
    [],
  );
  const [system, setSystem] = useState<{ label: string; value: string }[]>();
  const Cref = useRef();

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
      width: '320px',
      align: 'left',
    },
    {
      title: '站点人数',
      dataIndex: 'sitePeopleNummer',
      width: '80px',
      align: 'left',
    },
    {
      title: '所属项目',
      dataIndex: 'projectName',
      align: 'left',
    },
    {
      title: '所属系统',
      dataIndex: 'systemName',
      align: 'left',
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      width: '120px',
      align: 'left',
    },
    {
      title: '最近修改时间',
      dataIndex: 'createTime',
      align: 'left',
    },
    {
      title: '操作',
      key: 'operation',
      align: 'left',
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
        setList(res.data.list);
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
  useEffect(() => {
    getBelongProject({}).then((res) => {
      let projectData = res.data.map((item: any) => ({
        label: item.name,
        value: item.id.toString(),
      }));
      setProject(projectData);
    });
    getBelongSystem({}).then((res) => {
      let systemData = res.data.map((item: any) => ({
        label: item.systemName,
        value: item.id.toString(),
      }));
      setSystem(systemData);
    });
  }, []);

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
            <Input placeholder="请输入站点名称搜索" />
          </Form.Item>

          <Form.Item name="projectId">
            <Select
              placeholder="请选择所属项目"
              style={{ width: 200 }}
              showSearch
              optionFilterProp="label"
              filterOption={(input, option) =>
                (option?.label ?? '').includes(input)
              }
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={project}
            />
          </Form.Item>

          <Form.Item name="systemId">
            <Select
              placeholder="请选择所属系统"
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
              options={system}
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
      ref={Cref}
      type={AddCgType}
      id={Id}
      system={system}
      onSubmit={() => {
        toggle();
        // Cref?.current?.changshow('show');
        shareRef?.current?.clickSearchBtn('submit');
      }}
      onClose={() => {
        toggle();
        // Cref?.current?.changshow();
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
        result = <Detailpage id={Id} />;
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
              console.log('点击表格上方操作按钮回调');
              if (t === 'del') {
                setDel(true);
                let id = d[0];
                setId(id);
              } else {
                toggle();
              }

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
export default Site;
