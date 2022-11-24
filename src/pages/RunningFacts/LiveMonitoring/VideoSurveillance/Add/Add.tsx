interface Props {
  onClose: Function; // 关闭按钮回调方法
  onSubmit: Function; // 提交按钮回调方法
  mvId:string;//视频播放地址
}
import styles from './Add.less';

const Add = (props: Props) => {  
   const {mvId} = props

  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    props.onSubmit();
  };

  return (
    <div className={styles.videoc}>
      <iframe
        style={{
          width: '100%',
          height: '100%',
          margin: '0px',
          padding: '0px',
          border: '0px',
          position: 'relative',
        }}
        allowFullScreen
        src={mvId}
      />
    </div>
  );
};

export default Add;
