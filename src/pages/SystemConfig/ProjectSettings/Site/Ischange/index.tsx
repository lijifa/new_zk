import { QuestionCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import styles from './index.less'

const { confirm } = Modal;

interface DelWarnning {
  Show: boolean;
  Delete: any;
  Cancal: any;
  Content?: string;
}

const Ischange = (props: DelWarnning) => {
  const { Show, Delete, Cancal, Content } = props;

  function showConfirm() {
    confirm({
      centered: true,
      title: '系统提示',
      icon: <QuestionCircleOutlined />,
      content: Content || '确定修改项目信息?',
      okText: '删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        Delete();
      },
      onCancel() {
        Cancal();
      },
    });
  }

  return (
    <div className={styles.show}>
      <>{Show ? showConfirm() : null}</>
    </div>
  );
};

export default Ischange;
