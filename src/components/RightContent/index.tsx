import { outLogin, updateMfrsId } from '@/services/zg-base/login';
import { getCompanySelected, saveCompanySelected } from '@/utils/format';
import { clearStorageAll } from '@/utils/storageTool';
import { DownOutlined, PoweroffOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import type { MenuProps } from 'antd';
import { Button, Divider, Dropdown, Menu, message, Space } from 'antd';
import React from 'react';
import { useAliveController } from 'react-activation';
import IconFont from '../IconFont';
import styles from './index.less';

const GlobalHeaderRight: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const { updateMenuApiData, tags, removeTagFun } = useModel('menuModel');

  const { clear, drop } = useAliveController();
  // const companyName = initialState?.currentCompany.find((item: { key: number | undefined; }) => item.key === initialState.mfrsId)
  // console.log(companyName);

  // if (!initialState || !initialState.settings) {
  //   return null;
  // }

  // const { navTheme, layout } = initialState.settings;
  // let className = styles.right;

  // if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
  //   className = `${styles.right}  ${styles.dark}`;
  // }

  const onClick: MenuProps['onClick'] = async ({ key }) => {
    let keyNumber = Number(key);
    // 选择公司
    await updateMfrsId(keyNumber);

    let obj = initialState?.currentCompany.find(function (e: { key: number }) {
      return e.key === keyNumber;
    });

    // 跟进选择的公司更新左侧菜单
    updateMenuApiData(keyNumber).then(async (e) => {
      let { firstItemData } = e;
      // 标识被选中的公司项（is_selected: 0:未选择，1:已选择）
      saveCompanySelected(keyNumber);
      message.info('切换至: ' + obj.label);
      await setInitialState((s) => ({
        ...s,
        selectedCompany: obj,
      }));
      if (typeof clear === 'function') clear();
      history.replace('/home');
    });
  };

  const menu = (
    <Menu
      onClick={onClick}
      defaultSelectedKeys={['1']}
      style={{ color: '#fff', backgroundColor: '#2C303B' }}
      items={initialState?.currentCompany}
      className={styles.SelectCompany}
    />
  );

  const signOut = async () => {
    const res = await outLogin();
    if (res.code === 0) {
      clearStorageAll();
      setInitialState({
        isLogin: false,
        currentUser: {},
        currentCompany: [],
        selectedCompany: { key: 0, label: '--' },
      });
      history.replace('/login');
    }
  };
  return (
    <Space className={styles.right}>
      <Dropdown
        overlay={menu}
        trigger={['click']}
        overlayStyle={{ zIndex: 9999 }}
      >
        <a onClick={(e) => e.preventDefault()} style={{ color: '#FFF' }}>
          <Space>
            <div style={{ marginTop: 8 }}>
              <IconFont
                type="icon-jianzhu1"
                style={{ color: '#0ED1F9', fontSize: 22 }}
              />
            </div>
            {getCompanySelected().label}
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
      <Divider type="vertical" className={styles.vlineColor} />
      <Space>
        <div style={{ marginTop: 10 }}>
          <IconFont
            type="icon-yonghu"
            style={{
              color: '#FF62D7',
              fontSize: 22,
            }}
          />
        </div>

        <span className={`${styles.name} anticon`}>
          {' '}
          {initialState?.currentUser ? initialState.currentUser.userName : '-'}
        </span>
      </Space>
      <Button
        icon={<PoweroffOutlined />}
        type="text"
        danger
        onClick={() => signOut()}
        style={{ paddingTop: 23 }}
      >
        {' '}
        退出
      </Button>
    </Space>
  );
};
export default GlobalHeaderRight;
