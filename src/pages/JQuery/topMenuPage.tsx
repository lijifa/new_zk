import { getStorageItems } from '@/utils/storageTool';
import { useLocation, useParams } from '@umijs/max';
import { notification } from 'antd';
import QueueAnim from 'rc-queue-anim';
import { KeepAlive, useActivate, useUnactivate } from 'react-activation';

export default () => {
  const location = useLocation();
  const { id, childId } = useParams();
  if (typeof id === 'undefined' || typeof childId === 'undefined') return;
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
  // }, [childId]);
  // const [globalState, setGlobalState] = useState<any>({
  //   slogan: 'Hello MicroFrontend',
  // });

  //整理URL
  const menuItemData = MENU_INFO[id]['TopChildren'][childId];

  const menuItem = {
    menuId: menuItemData.menuNavId,
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
      style={{ width: '100%', height: 'calc(100% - 38px)' }}
      onEnd={({ key, type }) => {
        console.log('donghua  ====  type');
        console.log(key, type);
      }}
    >
      <div
        key={menuItem.menuId + '_lv1'}
        style={{ width: '100%', height: '100%' }}
      >
        <KeepAlive
          id={menuItem.menuId + '_lv1'}
          cacheKey={menuItem.menuId + '_lv1'}
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
              background: 'require(/public/image/bg.jpg)',
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
