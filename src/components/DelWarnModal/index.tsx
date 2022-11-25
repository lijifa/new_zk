import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import {getdeleteSite} from '@/services/SystemConfig/ProjectSetting/site'

const { confirm } = Modal;

interface DelWarnning {
  Show: boolean;
  Delete: any;
  Cancal: any;
  Content?: string;
  id:number;
}

const DelWarnModal = (props: DelWarnning) => {
  const { Show, Delete, Cancal, Content ,id} = props;
  console.log(id)

  function showConfirm() {
    confirm({
      centered: true,
      title: '系统提示',
      icon: <ExclamationCircleOutlined />,
      content: Content || '是否要删除选中数据?',
      okText: Content ? '确定' : '删除',
      okType: Content ? 'primary' : 'danger',
      cancelText: '取消',
      onOk() {
        Delete();
        getdeleteSite({id})
      },
      onCancel() {
        Cancal();
      },
    });
  }

  return <>{Show ? showConfirm() : null}</>;
};

export default DelWarnModal;
