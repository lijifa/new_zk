import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import {getdeleteProject} from '@/services/SystemConfig/ProjectSetting/project'

const { confirm } = Modal;

interface DelWarnning {
  Show: boolean;
  Delete: any;
  Cancal: any;
  Content?: string;
  id:number;
}

const DeletePage = (props: DelWarnning) => {
  const { Show, Delete, Cancal, Content ,id} = props;
  function showConfirm() {
    confirm({
      centered: true,
      title: '系统提示',
      icon: <ExclamationCircleOutlined />,
      content: Content || '是否要删除选中数据?',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        Delete();
        getdeleteProject({id})
      },
      onCancel() {
        Cancal();
      },
    });
  }

  return <>{Show ? showConfirm() : null}</>;
};

export default DeletePage;
