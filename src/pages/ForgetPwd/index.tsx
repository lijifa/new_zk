import { Button, Form, Input, Layout } from 'antd';
import React, { memo,useState,useRef,useEffect } from 'react';
import { PHONE } from './constant';
import styles from './index.less';

const { Header, Footer, Content } = Layout;

const ForgetPwd = memo(() => {
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
    const changePhoneNumber = (e :any)=>{
        const number = PHONE
        const phonenumber = e.target.value
        if(number.test(phonenumber)){
          setlike(false)
        }else{
          setlike(true)
          
        }
      }
  return (
    <Layout className={styles.layoutBg}>
      <Header className={styles.headerBox}></Header>
      <Content className={styles.contentBox}>
        <Form className={styles.Form}>
          <div className={styles.title}>重置密码</div>
          <hr></hr>
          <div className={styles.warn}>
            您的操作会修改系统平台的密码，为确认是你本人操作，请完成身份验证。
          </div>
          <Form.Item
            className={styles.Formitem}
            name="phoneNumber"
            rules={[
              { required: true, message: '手机号不能为空' },
              { pattern: new RegExp(PHONE), message: '请输入正确的手机号' },
            ]}
          >
            <Input
             onChange = {changePhoneNumber}
              addonBefore="手机号"
              className={styles.formInput}
              placeholder="请输入手机号"
              style={{ height: '44px' }}
              maxLength={11}
            ></Input>
          </Form.Item>
          <Form.Item
            className={styles.Formitem}
            name="yanzheng"
            rules={[{ required: true, message: '短信验证码不能为空' }]}
          >
            <Input
              className={styles.formInput1}
              placeholder="请输入图片验证码"
              maxLength={5}
            ></Input>
          </Form.Item>
          <Input
            style={{
              width: '156px',
              position: 'absolute',
              top: '233px',
              left: '438px',
            }}
          ></Input>
          <Form.Item
            className={styles.Formitem}
            name="verification"
            rules={[{ required: true, message: '验证码不能空' }]}
          >
            <Input
              className={styles.formInput2}
              placeholder="请输入验证码"
              maxLength={6}
            ></Input>
          </Form.Item>
           <Button
              className={styles.FormButtonM}
              disabled={like}
              onClick = {getVerification}
            >
              <div>{showCode()}</div>
            </Button>
          <Form.Item className={styles.Formitem}>
            <Button className={styles.FormButton}>下一步</Button>
          </Form.Item>
        </Form>
        <div className={styles.bottom}>
             <div className={styles.bottomO}>
                 <div className={styles.bootomC}>
                     <p>没收到短信验证码？</p>
                     <p>1、网络通信异常可能会造成短信丢失，请重新获取或稍后再试。</p>
                     <p>2、请核实手机是否已欠费停机，或者屏蔽了系统短信。</p>
                     <p>3、您也可以尝试将SIM卡移动到另一部手机，然后重试。</p>
                 </div>
             </div>
        </div>
      </Content>
      <Footer className={styles.footerBox}></Footer>
    </Layout>
  );
});

export default ForgetPwd;
