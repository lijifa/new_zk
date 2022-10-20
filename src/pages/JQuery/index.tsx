import { getStorageItems } from '@/utils/storageTool';
import { history, useLocation, useParams } from '@umijs/max';
import { notification } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { KeepAlive, useActivate, useUnactivate } from 'react-activation';

// 监听Iframe点击后跳转事件
window.clickJumpTo = (path = '') => {
  history.push(path);
};

export default () => {
  const location = useLocation();
  const { id, childId } = useParams();

  if (typeof id === 'undefined') {
    return;
  }
  const MENU_INFO = getStorageItems('MENU_INFO_CACHE');

  // useEffect(() => {
  //   notification.info({
  //     message: '[Chart] 加载页面ID:' + id,
  //   });

  //   return () => {
  //     notification.error({
  //       message: '[Chart] 卸载页面ID:' + id,
  //     });
  //   };
  // }, []);
  // const [globalState, setGlobalState] = useState<any>({
  //   slogan: 'Hello MicroFrontend',
  // });

  //整理URL
  const menuItemData = MENU_INFO[id];
  const menuItem = {
    menuId: menuItemData.menuId,
    menuName: menuItemData.menuName,
    iframeUrl: encodeURIComponent(menuItemData.url),
  };
  const formatUrl = () => {
    let targetUrl = decodeURIComponent(menuItem.iframeUrl);

    let result = targetUrl[0] !== '/' ? '/' + targetUrl : targetUrl;
    // if (location.state.fromTab) {
    //   result = targetUrl;
    // }
    return result;
  };

  useActivate(() => {
    notification.success({
      message: '[JQuery] activated',
    });
    console.log('我被激活了');
  });
  useUnactivate(() => {
    notification.warning({
      message: '[JQuery] unactivated',
    });
    console.log('我被缓存了');
  });

  return (
    <QueueAnim
      delay={300}
      duration={800}
      animConfig={{ opacity: [1, 0] }}
      className="queue-simple"
      style={{ width: '100%', height: 'calc(100% - 32px)' }}
      onEnd={({ key, type }) => {}}
    >
      <div
        key={menuItem.menuId + '_lv2'}
        style={{ width: '100%', height: '100%' }}
      >
        <KeepAlive
          id={menuItem.menuId + '_lv2'}
          cacheKey={menuItem.menuId + '_lv2'}
          name={location.pathname}
          path={location.pathname}
          tabName={menuItem.menuName}
        >
          <iframe
            style={{
              width: '100%',
              height: '100%',
              margin: '0px',
              padding: '0px',
              border: '0px',
              position: 'relative',
              background: 'rgba(35, 31, 32,0)',
            }}
            src={formatUrl()} //'/zg-old/bussiness/companyU3d/index.html?a=1&titlename=华德智慧能源企业总览'
          />
        </KeepAlive>
      </div>
    </QueueAnim>
  );
  // return <MicroApp
  //           name="JQuery"
  //           globalState={globalState}
  //           setGlobalState={setGlobalState}
  //           autoSetLoading={false}
  //         />;
};
