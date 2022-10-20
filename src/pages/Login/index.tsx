import {
  companyList,
  login,
  outLogin,
  updateMfrsId,
} from '@/services/zg-base/login';
import { saveCompanySelected } from '@/utils/format';
import { clearStorageAll, setStorageItems } from '@/utils/storageTool';
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Button, Form, Input, Layout, message } from 'antd';
import ChooseCompany from './ChooseCompany';
import { useState } from 'react';
import styles from './index.less';

const { Header, Footer, Content } = Layout;
// const LoginMessage: React.FC<{
//   content: string;
// }> = ({ content }) => {
//   return (
//     <Alert
//       style={{
//         marginBottom: 24,
//       }}
//       message={content}
//       type="error"
//       showIcon
//     />
//   );
// };
//点击智控平台触发跳转
const changerl = () => {
  window.open('http://zk.hdzhenergy.cn/');
};

const Login = () => {
  const { setInitialState } = useModel('@@initialState');
  const { updateMenuApiData } = useModel('menuModel');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  // 判断当前是否已登录
  // if (initialState?.isLogin) {
  //   const urlParams = new URL(window.location.href).searchParams;
  //   history.push(urlParams.get('redirect') || '/home');
  //   return;
  // }

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

  const changeLogin = (event: any) => {
    if (event.target.value.length >= 5) {
      return setIsLogin(true);
    }
    return setIsLogin(false);
  };

  return (
    <Layout className={styles.layoutBg}>
      <Header className={styles.headerBox}>
        <img src="/image/logo.png" />
        <div className={styles.other} onClick={changerl}>
          智控平台
        </div>
      </Header>
      <Content className={styles.contentBox}>
        <div className={styles.leftBox}>
          <video
            src={require('@/assets/Login/login_video_bg.mp4')}
            autoPlay={true}
            muted={true}
            loop={true}
          ></video>
        </div>
        <div className={styles.rightBox}>
          <div className={styles.loginBox}>
            <h1 className={styles.loginTitle}>智观用户登录</h1>
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
                  prefix={<UserOutlined className={styles.loginIcon} />}
                  autoComplete="off"
                  placeholder="请输入用户名/手机号"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: '密码不能为空' }]}
              >
                <Input.Password
                  prefix={<LockOutlined className={styles.loginIcon} />}
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
              <div className={styles.rememberPwdBox}>
                <PhoneOutlined className={styles.loginIcon} />
                <span>业务咨询电话：022-59698888</span>
              </div>

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
                <span className={styles.rememberPwdBox}>
                  构建楼宇全场景智慧物联生态圈--助力实现节能降碳目标
                </span>
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
