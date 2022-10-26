import { Button, Form, Input, Layout } from 'antd';
import React, { useEffect, useState,useRef } from 'react';
import styles from './index.less';
import {PHONE,LoginName,USERNAME,PASSWORD } from './constant'

const { Header, Footer, Content } = Layout;
const CompanyReg: React.FC =(props,ref) => {
  // console.log(getFieldDecorator)
  const [layout, setyatout] = useState({
    labelCol: { span: 5 },
    wrapperCol: { span: 24 },
  });
  const [like,setlike] = useState<boolean>(true)
  const [count,setcount] = useState<number>(60)
  const [show,setshow] = useState(true)
  const timeref = useRef<any>(null)
  useEffect(()=>{
    if(count === 0){
      clearInterval(timeref.current),
      setcount(60)
      setshow(true)
      setlike(false)
    }

  },[count])
  //输入手机号
  const changePhoneNumber = (e :any)=>{
    const number = PHONE
    const phonenumber = e.target.value
    if(number.test(phonenumber)){
      setlike(false)
    }else{
      setlike(true)
      
    }
  }
  const cutCount = () =>{
    setcount((pre) => pre -1 )
    setlike(true)
  }
  const getVerification = () =>{
    setshow(false) 
    cutCount()
    timeref.current = setInterval(cutCount,1000)
  }
  function showCode(){
    if(show === true){
      return(
        <div>获取验证码</div>
      )
    }else{
      return(
        <div>已发送({count})</div>
      )
    }
  }
 
  return (
    <Layout className={styles.layoutBg}>
      <Header className={styles.headerBox}></Header>
      <Content className={styles.contentBox}>
        <div className={styles.formTitle}>企业注册</div>
        <Form 
        className={styles.mianForm} 
        {...layout}
         labelAlign="left"
         
         >
          <Form.Item
            className={styles.Formitem}
            label="手机号"
            name="phoneNumber"
            rules={[
              { required: true, message: '手机号不能为空' },
              {pattern:new RegExp(PHONE),message:'请输入正确的手机号'}
            ]}
          >
            <Input
              onChange = {changePhoneNumber}
              className={styles.formInput}
              placeholder="请输入11位手机号"
              maxLength= {11}
            ></Input>
          </Form.Item>
          <Form.Item
            className={styles.Formitem}
            label="图形验证码"
            name="validateCode"
            rules={[{ required: true, message: '图形验证码不能为空' }]}
          >
            <Input
              style={{width:'230px'}}
              className={styles.formInput}
              placeholder="输入图形验证码"
            ></Input>
          </Form.Item>
          <Form.Item
          style={{position:'absolute', top: '72px',left: '350px'}}
            className={styles.Formitem}
          >
            <Input
              style={{width:'150px'}}
              className={styles.formInput}
            ></Input>
          </Form.Item>
       
          <Form.Item
            className={styles.Formitem}
            label="短信验证码"
            name="yanzheng"
            rules={[{ required: true, message: '短信验证码不能为空' }]}
          >
            <Input
             style={{width:'230px'}}
              className={styles.formInput}
              placeholder="输入收到的六位验证码"
              maxLength= {6}
            ></Input>
          </Form.Item>
          <Form.Item
            className={styles.Formitem}
            name="loginName"
            label="用户名"
            rules={[
              { required: true, message: '支持4-20位的大小写字母和数字，至少有一位字母' },
              {pattern:new RegExp(LoginName),message:'支持4-20位的大小写字母和数字，至少有一位字母'}
            
            ]}
          >
            <Input
              className={styles.formInput}
              placeholder="支持4-20位的大小写字母和数字，至少有一位字母"
              maxLength= {20}
            ></Input>
          </Form.Item>
          <Form.Item
          style={{position:'absolute', top: '140px',left: '350px'}}
            className={styles.Formitem}
          >
          <Button
              className={styles.formInput}
              disabled={like}
              onClick={getVerification}
              style={{
                color: 'rgba(38, 140, 255, 1)',
                width:'150px'
              }}
            >
              <div>{showCode()}</div>
            </Button>
          </Form.Item>
          <Form.Item
            className={styles.Formitem}
            label="真实姓名"
            name="userName"
            rules={[
              { required: true, message: '真实姓名不能为空' },
              {pattern:new RegExp(USERNAME),message:'请输入正确的名字'}
            ]}
          >
            <Input
              className={styles.formInput}
              placeholder="支持汉字或字母，2-10位"
              maxLength= {10}
            ></Input>
          </Form.Item>
          <Form.Item
            className={styles.Formitem}
            label="设置密码"
            name="password"
            rules={[
              { required: true, message: '密码不能为空' },
              {pattern:new RegExp(PASSWORD),message:'请输入正确的密码'},
            ]}
          >
            <Input.Password
              type='password'
              className={styles.formInput}
              placeholder="支持4-20位的大小写字母和数字，至少有一位字母"
              maxLength= {20}
            ></Input.Password>
          </Form.Item>
          <Form.Item
            className={styles.Formitem}
            label="确认密码"
            name="checkPassword"
            rules={[
              { required: true, message: '确认密码不能为空' },
              ({getFieldValue})=>({
                validator(_,value){
                  if(!value || getFieldValue('password') === value){
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('两次密码不一致'))
                }
              })
            
            ]}
          >
            <Input.Password
              type='password'
              className={styles.formInput}
              placeholder="请再次输入密码"
              maxLength= {20}
            ></Input.Password>
          </Form.Item>
          <Form.Item>
            <p style={{ float:'left',marginLeft:'5px' }}>
              注册代表同意 <a>智控用户协议</a>
            </p>
            <p style={{ float:'right',marginRight:'13px'}}>
              已有账号？ <a>登录</a>
            </p>
          </Form.Item>
          <Form.Item>
            <Button
              className={styles.loginFormButtonTrue}
              style={{ width: '400px', marginLeft: '80px' }}
            >
              注册
            </Button>
          </Form.Item>
        </Form>
      </Content>
      <Footer className={styles.footerBox}></Footer>
    </Layout>
  );
};

export default CompanyReg;
