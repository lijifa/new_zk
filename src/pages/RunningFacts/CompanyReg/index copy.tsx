import { Button, Form, Input, Layout } from 'antd';
import React from 'react';
import styles from './index.less';

const { Header, Footer, Content } = Layout;
const Register: React.FC = () => {
  return (
    <Layout className={styles.layoutBg}>
      <Header className={styles.headerBox}></Header>
      <Content className={styles.contentBox}>
        <div className={styles.formTitle}>企业注册</div>
        <Form className={styles.mianForm}>
          <Form.Item
            className={styles.Formitem}
            name="phoneNumber"
            label="手机号"
            rules={[{ required: true, message: '手机号不能为空' }]}
          >
            <Input
              style={{ marginLeft: '25px' }}
              className={styles.formInput}
              placeholder="请输入11位手机号"
            ></Input>
          </Form.Item>
          <Form.Item
            label="图形验证码"
            name="validateCode"
            className={styles.Formitem}
            rules={[{ required: true, message: '手机号不能为空' }]}
          >
            <Input
              className={styles.formInput}
              placeholder="输入图形验证码"
            ></Input>
            <Input
              className={styles.formInput}
              style={{ flex: '0.6', marginLeft: '10px' }}
            ></Input>
          </Form.Item>
          <Form.Item
            label="短信验证码"
            name="yanzheng"
            className={styles.Formitem}
            rules={[{ required: true, message: '手机号不能为空' }]}
          >
            <Input
              className={styles.formInput}
              placeholder="输入收到的六位验证码"
            ></Input>
           
          </Form.Item>
          <Form.Item>
          <Button
              className={styles.formInput}
              style={{
                flex: '0.6',
                marginLeft: '10px',
                color: 'rgba(38, 140, 255, 1)',
              }}
            >
              获取验证码
            </Button>
          </Form.Item>
          <Form.Item
            className={styles.Formitem}
            name="loginName"
            label="用户名"
            rules={[{ required: true, message: '手机号不能为空' }]}
          >
            <Input
              style={{ marginLeft: '25px' }}
              className={styles.formInput}
              placeholder="支持4-20位的大小写字母和数字，至少有一位字母"
            ></Input>
          </Form.Item>
          <Form.Item
            label="真实姓名"
            name="userName"
            className={styles.Formitem}
            rules={[{ required: true, message: '手机号不能为空' }]}
          >
            <Input
              style={{ marginLeft: '10px' }}
              className={styles.formInput}
              placeholder="支持汉字或字母，2-10位"
            ></Input>
          </Form.Item>
          <Form.Item
            label="设置密码"
            name="password"
            className={styles.Formitem}
            rules={[{ required: true, message: '手机号不能为空' }]}
          >
            <Input.Password
              placeholder="请输入密码"
              style={{ marginLeft: '10px' }}
              className={styles.formInput}
            ></Input.Password>
          </Form.Item>
          <Form.Item
            label="确认密码"
            name="checkPassword"
            className={styles.Formitem}
            rules={[{ required: true, message: '手机号不能为空' }]}
          >
            <Input.Password
              placeholder="请再次输入密码"
              style={{ marginLeft: '10px' }}
              className={styles.formInput}
            ></Input.Password>
          </Form.Item>
          <Form.Item>
            <p style={{marginLeft:'8px'}}>
              注册代表同意 <a>智控用户协议</a>
            </p>
            <p style={{marginRight:'28px'}}>
              已有账号？ <a>登录</a>
            </p>
          </Form.Item>
          <Form.Item>
            <Button className={styles.loginFormButtonTrue} style={{width:'400px',marginLeft:'80px'}}>注册</Button>
          </Form.Item>
        </Form>
      </Content>
      <Footer className={styles.footerBox}></Footer>
    </Layout>
  );
};

export default Register;
