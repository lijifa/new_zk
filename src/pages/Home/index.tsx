import { getCompanySelected } from '@/utils/format';
import { useModel } from '@umijs/max';
import QueueAnim from 'rc-queue-anim';
import { useEffect } from 'react';

const HomePage: React.FC = () => {
  const { updateMenuApiData, menuItem } = useModel('menuModel');

  useEffect(() => {
    // 初始化第一个菜单
    let comIndex = getCompanySelected();
    updateMenuApiData(comIndex.key).then((e: any) => {
      let { firstItemData } = e;
    });
  }, []);

  return (
    <QueueAnim
      delay={300}
      duration={800}
      animConfig={{ opacity: [1, 0] }}
      className="queue-simple"
      style={{ width: '100%', height: 'calc(100% - 32px)' }}
    >
      <div key={menuItem.menuId} style={{ width: '100%', height: '100%' }}>
        {menuItem.menuId ? (
          <iframe
            style={{
              width: '100%',
              height: '100%',
              margin: '0px',
              padding: '0px',
              border: '0px',
              position: 'relative',
              background: 'rgb(35, 31, 32,0)',
            }}
            src={menuItem.url}
          />
        ) : null}
      </div>
    </QueueAnim>
  );
};

export default HomePage;
