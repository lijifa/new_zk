import SubHeader from '@/components/SubHeader';
import { useBoolean } from 'ahooks';
import { Modal, Select,Pagination } from 'antd';
import React, { memo,useState } from 'react';
import Add from './Add/Add';
import styles from './index.less';
const { Option } = Select;
const data: any = [
  {
    label: '静海政府能源管理',
  },
  {
    label: '武清人民医院',
  },
];
//播放
function NewPlayer(Title: string, type: boolean, distance?: boolean) {
  const [state, { toggle }] = useBoolean(false);
  const [mvId,setmvId] = useState<string>('')
  const CameraView = () => {
    toggle();
    setmvId('https://open.ys7.com/ezopen/h5/iframe_se?url=ezopen://open.ys7.com/C29108153/1.live&autoplay=1&accessToken=at.33xq5l1971pfcmoe01ea2z0o0gvdbsew-1se9v40qrd-0qeuozm-xhxwctwmj&begin=20221121&end=20221128')
  };
  return (
    <>
      <div
        className={styles.cameraItem}
        style={{ marginRight: distance ? '0px' : '' }}
      >
        <div className={styles.ctitle}>
          <img src={require('./img/cameraIcon.png')} />
          <div className={styles.text}>{Title}</div>

          <div className={styles.right}>
            <i></i>
            {type ? '在线' : '离线'}
          </div>
        </div>
        <div className={styles.cmain} onClick={CameraView}>
          <img className={styles.camer} src="" />
          <img
            className={styles.cameraPlay}
            src={require('./img/playCamera.png')}
          />
        </div>
      </div>
      <Modal
        title="监控摄像头播放"
        open={state}
        footer={null}
        destroyOnClose={true}
        centered={true}
        onCancel={toggle}
        width={1000}
        bodyStyle={{
          height: '600px',
          padding:'0px 20px 40px 20px'
        }}
      >
        <Add
         mvId={mvId}
          onSubmit={() => {
            toggle();
          }}
          onClose={() => {
            toggle();
          }}
        />
      </Modal>
    </>
  );
}

const VideoSurveillance = memo(() => {
  return (
    <div className={styles.main}>
      <SubHeader
        title={'影像监控'}
        leftItem={
          <>
            <div>
              {data.map((res: any, index: any) => {
                return <Option key={index}>{res.label}</Option>;
              })}
            </div>
          </>
        }
      />
      <div className={styles.mainContent}>
        {NewPlayer('配电室监控', true)}
        {NewPlayer('水源机监控', true)}
        {NewPlayer('锅炉监控', true)}
        {NewPlayer('水泵监控', true, true)}
        {NewPlayer('冷冻泵监控', true)}
        {NewPlayer('地热井监控', true)}
        {NewPlayer('水箱监控', true)}
        {NewPlayer('冷却塔监控', true, true)}
        {NewPlayer('室外设备监控', true)}
        {NewPlayer('办公室监控', true)}
      </div>
      <div className={styles.page}>
        <span>第 1 到 10 条，共 10 条记录。</span>
        <Pagination size="small" total={50} />
      </div>
    </div>
  );
});

export default VideoSurveillance;
