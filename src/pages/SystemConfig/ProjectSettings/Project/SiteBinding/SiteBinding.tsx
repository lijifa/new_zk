interface Props {
  onClose: Function; // 关闭按钮回调方法
  onSubmit: Function; // 提交按钮回调方法
  Type: string; // 传入的类型
  id: number; //父组件传递来的类型
}
import ModalFooter from '@/components/ModalFooter';
import ZKTable from '@/components/ZKTable';
import { getBindSite ,getBindprojectSite} from '@/services/SystemConfig/ProjectSetting/project';
import { Button, Form, Input, Space, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import styles from './Inine.less';



const SiteBinding = (props: Props) => {
  const [form] = Form.useForm();
  const shareRef = useRef();
  const [tags, setTag] = useState<Array<string>>(['默认标题']);

  const [slectId, setSlectId] = useState<Array<string>>([]);
  const [newcheckList, setNewcheckList] = useState<Array<any>>([]);
  const [newprojectId,setnewProject] = useState<string>('')
  const { Type, id } = props;

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    getBindprojectSite({projectId:id,siteIds:newprojectId})
    props.onSubmit();
  };
  // 表格列字段
  const columns = [
    {
      title: '站点名称',
      dataIndex: 'name',
      align: 'left',
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
      dataIndex: 'createTime',
    },
  ];
  const columnsI = [
    {
      title: '姓名',
      dataIndex: 'reason',
      align: 'left',
    },
    {
      title: '手机号',
      dataIndex: 'systemName',
    },
    {
      title: '所属岗位',
      dataIndex: 'siteName',
    },
    {
      title: '所属部门',
      dataIndex: 'siteProject',
    },
  ];
  useEffect(() => {}, [newcheckList]);

  // 获取表格数据
  const getTableData = (paramData: any) => {
    paramData['id'] = id;
    return getBindSite(paramData).then((res) => {
      console.log(res.data.list)
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
  // 高级搜索栏Form
  const advanceSearchForm = (
    <div className="zkSearchBox">
      <Space align="center">
        <Form.Item name="name">
          <Input placeholder="请输入站点名称" />
        </Form.Item>
        <Button type="primary" onClick={() => searchOper('submit')}>
          搜索
        </Button>
        <Button onClick={() => searchOper('reset')}>重置</Button>
      </Space>
    </div>
  );
  // 点击搜索、重置按钮
  const searchOper = (type: string) => {
    shareRef?.current?.clickSearchBtn(type);
  };
  //添加标签
  function Taddtag(e: any) {
    let projectIdData= e.map((item: any) => item.id).toString();
    console.log(projectIdData);
    setnewProject(projectIdData)
    setNewcheckList(e);
    let tagList: Array<string> = [];
    e.map((item: any) => {
      tagList.push(item.businessAlarmRuleTempId);
      const reslut = Array.from(new Set(tagList));
      setSlectId(reslut);
      if (tags.indexOf(item.reason) === -1) {
        setTag([...tags, item.reason]);
      }
    });
  }
  //删除标签
  const handleClose = (removedTag: string) => {
    const newTags = newcheckList.filter((tag) => tag !== removedTag);
    setNewcheckList(newTags);
    let newIdList: Array<number> = [];
    newTags.map((item) => {
      newIdList.push(item.id);
    });
    shareRef?.current?.changeRowCheckBox(newIdList);
  };
  const forMap = (tag: any) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag.name}
      </Tag>
    );
    return (
      <span
        key={tag.businessAlarmRuleTempId}
        style={{ display: 'inline-block' }}
      >
        {tagElem}
      </span>
    );
  };
  const tagChild = newcheckList.map(forMap);

  return (
    <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{}}>
      <div className={styles.title}>{advanceSearchForm}</div>
      {Type === 'detail' ? <div className={styles.center}>{tagChild}</div> : ''}

      <div
        className={'zkTableContent'}
        style={{ paddingLeft: '0px', paddingRight: '0px' }}
      >
        <ZKTable
          rowId={'id'}
          btnList={[]}
          searchForm={form}
          isRowCheck={Type === 'detail' ? true : false}
          tableColumns={Type === 'detail' ? columns : columnsI}
          tableDataFun={getTableData}
          defaultFormItem={{}}
          clickOperBtn={(t: string, d: any) => {
            console.log(
              't：按钮的类型【add/edit/del/export】;\n d：选中行数据',
            );
            console.log(t, d);
            console.log('点击表格上方操作按钮回调');
          }}
          ref={shareRef}
          onRowCheckBoxFun={Taddtag}
        />
      </div>

      <ModalFooter
        cancelFun={() => {
          props.onClose();
        }}
      />
    </Form>
  );
};

export default SiteBinding;
