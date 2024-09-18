import React, { useRef, useState } from "react";
import logo from "@/image/logo.png";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import loginImg from "@/image/login.png";
import { App, Button, Divider, Input, Space } from "antd";
import { registerApi, sendCodeApi } from "@/api/httpApi";
import { Jump } from "@/utils/tools";

function Registered() {
  const history = useHistory();
  const { message, notification } = App.useApp();

  const username = useRef(null);
  const password = useRef(null);
  const phone = useRef(null)
  const verificationCode = useRef(null)

  const [isSendCode, setIsSendCode] = useState(false)

  const [loading, setLoading] = useState(false);

  const [codeLoading, setCodeLoading] = useState(false)

  // 登录
  const login = async () => {
    const usernameValue = username.current.input.value;
    const passwordValue = password.current.input.value;
    const phoneValue = phone.current.input.value
    const codeValue = verificationCode.current.input.value

    if (!usernameValue || !passwordValue || !codeValue || !phoneValue) return message.warning('请您输入完整的信息');

    setLoading(true);
    const res = await registerApi(usernameValue, passwordValue, phoneValue, codeValue);

    setTimeout(() => {
      if (res.code !== 200) {
        setLoading(false);
        return message.error(res.msg);
      }

      setLoading(false);
      notification.success({
        message: t('Registered.Registered.903390-1'),
        description: t('Registered.Registered.903390-2'),
      });
      history.push("/login");
    }, 1000);
  };

  const toLogin = (e) => {
    e.preventDefault();
    Jump("/login", history);
  };

  const sendCode = async () => {
    const phoneValue = phone.current.input.value
    if (!phoneValue) return message.warning('请输入手机号！')
    setCodeLoading(true)
    const res = await sendCodeApi(phoneValue)
    setCodeLoading(false)
    if (res.code !== 200) return message.error(res.msg)
    setIsSendCode(true)
    message.success('验证码已发送至您的手机，请注意查收！')
  }

  return (
    <MainBox>
      <BackGround>
        <p>@un data io</p>
        <div>
          <h1>UNDATA.IO</h1>
          <p>Get highly productive through automation and save tons of time!</p>
        </div>
        <p>© 2024 MIND-COMPUTE AI</p>
      </BackGround>
      <Action>
        <LoginBox>
          <h1>
            <img src={logo} alt="" />
            {t('Registered.Registered.903390-3')}
          </h1>
          <h2>
            {t('Registered.Registered.903390-4')}{" "}
            <a href="/#" onClick={toLogin}>
              {t('Registered.Registered.903390-5')}
            </a>
          </h2>
          {/* <h2>{t('Registered.Registered.903390-6')}</h2> */}
          {/* <Divider plain>{t('Registered.Registered.903390-7')}</Divider> */}
          <Input placeholder={'请输入手机号'} size="large" ref={phone} />
          <CodeCom >
            <Input placeholder={'请输入验证码'} size="large" ref={verificationCode} />
            <Button
              size="large"
              type="primary"
              disabled={isSendCode}
              onClick={sendCode}
              loading={codeLoading}
              style={{ margin: 0, height: 50, width: '35%' }} >
              {!isSendCode ? '获取验证码' : '已发送'}
            </Button>
          </CodeCom>

          <Input placeholder={'请输入用户名'} size="large" ref={username} />
          <Input
            placeholder={t('Registered.Registered.903390-9')}
            type="password"
            size="large"
            ref={password}
            onKeyUp={({ keyCode }) => (keyCode === 13 ? login() : undefined)}
          />
          <Button
            size="large"
            type="primary"
            loading={loading}
            style={{ height: "50px", fontSize: "20px" }}
            onClick={login}
          >
            {t('Registered.Registered.903390-10')}
          </Button>
          <span>
            {t('Registered.Registered.7725622-0')}{t('Registered.Registered.903390-9')}？{" "}
            <a href="/#" onClick={(e) => e.preventDefault()}>
              {t('Registered.Registered.903390-12')}
            </a>
          </span>
        </LoginBox>
      </Action>
    </MainBox>
  );
}

const MainBox = styled.div`
  height: 100vh;
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  overflow: hidden;
  > div {
    height: 100%;
  }
`;

const CodeCom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 12px;
`



const BackGround = styled.div`
  width: 60%;
  background-image: linear-gradient(180deg, #4334e1, rgba(46, 53, 71, 0.35)), url(${loginImg});
  background-repeat: no-repeat;
  background-size: cover;
  padding: 40px 140px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  img {
    height: 28px;
  }
  > p {
    color: #f5f5f5ba;
    font-size: 14px;
  }
  > div {
    color: white;
    h1 {
      font-size: 96px;
      margin-top: -300px;
      font-style: italic;
    }

    p {
      margin-top: 16px;
      font-size: 20px;
      letter-spacing: 2px;
      margin-left: 8px; font-style: italic;
    }
  }
`;

const Action = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBox = styled.div`
  max-width: 560px;
  width: 90%;
  height: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px; font-style: italic;
  h1 {
    font-size: 60px;
    letter-spacing: 4px;
    display: flex;
    align-items: center;
    gap: 12px;
    img {
      width: 60px;
      height: 60px;
    }
  }
  h2 {
    font-size: 16px;
    font-weight: 300;
  }
  input {
    height: 50px;
    width: 100%;
  }
  button {
    width: 100%;
    margin-top: 20px;
  }
  > span {
    font-size: 14px;
    color: #808080c3;
  }
`;

export default Registered;
