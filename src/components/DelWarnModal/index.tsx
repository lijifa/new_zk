import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';

const { confirm } = Modal;

interface DelWarnning {
  Show: boolean;
  Delete: any;
  Cancal: any;
  Content?: string;
}

const DelWarnModal = (props: DelWarnning) => {
  const { Show, Delete, Cancal, Content } = props;

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
      },
      onCancel() {
        Cancal();
      },
    });
  }

  return <>{Show ? showConfirm() : null}</>;
};

export default DelWarnModal;
