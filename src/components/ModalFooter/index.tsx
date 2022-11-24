import { Button, Row, Space } from 'antd';
interface Props {
  okText?: string; // 确认按钮文字
  cancelText?: string; // 取消按钮文字
  okFun?: Function; // 确认回调
  cancelFun: Function; // 取消回调
}

const ModalFooter = (props: Props) => {
  let { okText, cancelText, okFun, cancelFun } = props;

  const okBtn = () => {
    if (okFun && typeof okFun === 'function') {
      return (
        <Button type="primary" onClick={() => okFun!()}>
          {okText ? okText : '确定'}
        </Button>
      );
    } else {
      return (
        <Button type="primary" htmlType="submit">
          {okText ? okText : '确定'}
        </Button>
      );
    }
  };

  return (
    <Row
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        padding: '10px 24px',
        width: '100%',
      }}
      justify="end"
    >
      <Space>
        {okBtn()}
        <Button type="primary" onClick={() => cancelFun()} ghost>
          {cancelText ? cancelText : '取消'}
        </Button>
      </Space>
    </Row>
  );
};

export default ModalFooter;
