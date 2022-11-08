import {
  companyList,
  login,
  outLogin,
  updateMfrsId,
} from '@/services/zg-base/login';
import { saveCompanySelected } from '@/utils/format';
import { clearStorageAll, setStorageItems } from '@/utils/storageTool';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Button, Form, Input, Layout, message } from 'antd';
import { useState } from 'react';
import ChooseCompany from './ChooseCompany';
import styles from './index.less';

const { Header, Footer, Content } = Layout;
//点击智控平台触发跳转
const changerl = () => {
  window.open('http://zk.hdzhenergy.cn/');
};

const Login = () => {
  const { setInitialState } = useModel('@@initialState');
  const { updateMenuApiData } = useModel('menuModel');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  // 登录成功回调
  const loginSuccessFun = async (companyItem: {
    key: number;
    label: string;
  }) => {
    // 选择公司公司
    await updateMfrsId(companyItem.key);

    // 选择公司，并将选择项存入应用缓存
    await setInitialState((s) => ({
      ...s,
      selectedCompany: companyItem,
    }));

    // 初始化第一个菜单
    updateMenuApiData(companyItem.key).then((e) => {
      let { firstItemData } = e;
      message.success('登录成功！');

      // 设置被选中的公司项
      saveCompanySelected(companyItem.key);
      history.push(firstItemData?.routePath || '/home');
    });
  };

  // 点击登录提交
  const handleSubmit = async (values: API.LoginParams) => {
    try {
      // 登录
      const userInfo = await login({ ...values });

      // 获取公司
      const company = await companyList();
      let companyFormat = await company.data.map(
        (item: { mfrsId: number; name: string }, index: number) => {
          return {
            key: item.mfrsId,
            label: item.name,
            is_selected: index === 0 ? 1 : 0,
          };
        },
      );

      // 设置应用缓存
      await setInitialState((s) => ({
        ...s,
        currentUser: userInfo.data,
        currentCompany: companyFormat,
        selectedCompany: companyFormat[0],
      }));

      // 存储本地缓存
      setStorageItems('USER_INFO_CACHE', userInfo.data);
      setStorageItems('COMPANY_INFO_CACHE', companyFormat);

      if (companyFormat.length > 1) {
        setIsModalVisible(!isModalVisible);
      } else {
        loginSuccessFun(companyFormat[0]);
      }
    } catch (error) {
      console.log(error);
      message.error('登录失败，请重试！');
    }
  };

  // 是否弹出公司选择框
  const isOpenModal = async (isClean = false) => {
    if (isClean) {
      await outLogin();
      clearStorageAll();
      setInitialState({
        isLogin: false,
        currentUser: {},
        currentCompany: [],
        selectedCompany: { key: 0, label: '--' },
      });
    }
    setIsModalVisible(!isModalVisible);
  };

  // 按钮样式修改函数
  const changeLogin = (event: any) => {
    if (event.target.value.length >= 5) {
      return setIsLogin(true);
    }
    return setIsLogin(false);
  };

  // 重置密码
  const resetPwd = (event: any) => {
    event.preventDefault();
    console.log('忘记密码');
    history.push('/forgetpwd')
  };

  // 企业注册
  const pathToRegister = (event: any) => {
    event.preventDefault();
    console.log('企业注册');
    history.push('/companyreg')
  };

  return (
    <Layout className={styles.layoutBg}>
      <Header className={styles.headerBox}>
        <div className={styles.headerLogo}></div>
        <div className={styles.other} onClick={changerl}>
          智观平台
        </div>
        <div className={styles.navBarLine}></div>
      </Header>
      <Content className={styles.contentBox}>
        <div className={styles.leftBox}>
          <video
            src={require('@/assets/Login/loginBg.mp4')}
            autoPlay={true}
            muted={true}
            loop={true}
          ></video>
        </div>
        <div className={styles.rightBox}>
          <div className={styles.loginBox}>
            <div className={styles.loginTitle}>
              <div className={styles.loginTitleImg} />
            </div>
            <div className={styles.titleBarLine} />
            <Form
              name="normal_login"
              className={styles.loginForm}
              initialValues={{ remember: true }}
              onFinish={async (values) => {
                await handleSubmit(values as API.LoginParams);
              }}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: '用户名/手机号不能为空' }]}
              >
                <Input
                  className={styles.formInput}
                  prefix={<div className={styles.userIcon}>账户</div>}
                  autoComplete="off"
                  placeholder="请输入用户名/手机号"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: '密码不能为空' }]}
              >
                <Input.Password
                  prefix={<div className={styles.pwdIcon}>密码</div>}
                  type="password"
                  className={styles.formInput}
                  placeholder="请输入密码"
                  iconRender={(visible) =>
                    visible ? (
                      <EyeTwoTone className={styles.loginIcon} />
                    ) : (
                      <EyeInvisibleOutlined className={styles.loginIcon} />
                    )
                  }
                  onChange={(e: any) => {
                    changeLogin(e);
                  }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className={
                    isLogin
                      ? styles.loginFormButtonTrue
                      : styles.loginFormButton
                  }
                >
                  登 录
                </Button>
                <div className={styles.titleTextBox}>
                  <div>
                    还没有账号？
                    <a onClick={(e) => pathToRegister(e)}>企业注册</a>
                  </div>
                  <div>
                    <a onClick={(e) => resetPwd(e)}>{'忘记密码>>'}</a>
                  </div>
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>
        <ChooseCompany
          isModalVisible={isModalVisible}
          isOpenFun={(e: boolean | undefined) => isOpenModal(e)}
          callBackFun={(e: { key: number; label: string }) =>
            loginSuccessFun(e)
          }
        />
      </Content>

      <Footer className={styles.footerBox}>
        Copyright © 华德智慧能源管理（天津）有限公司 版权所有
        津ICP备16006426号-1
      </Footer>
    </Layout>
  );
};

export default Login;
