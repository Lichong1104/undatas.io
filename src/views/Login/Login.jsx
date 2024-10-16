import React, { useRef, useState } from "react";
import { setToken } from "@/utils/handleToken";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import loginImg from "@/image/login.png";
import { App, Button, Divider, Input } from "antd";
import { loginApi } from "@/api/httpApi";
import { Jump } from "@/utils/tools";
import logoIcon from "@/image/logo.png";
import logo from "@/image/undatas-logo.png";
import LocaleButton from "@/components/LocaleButton/LocaleButton";
import { useDispatch } from "react-redux";

function Login() {
  const history = useHistory();
  const { message, notification } = App.useApp();
  const dispatch = useDispatch();

  const username = useRef(null);
  const password = useRef(null);

  const [loading, setLoading] = useState(false);

  // {t('Login.Login.9034114-10')}
  const login = async () => {
    const usernameValue = username.current.input.value;
    const passwordValue = password.current.input.value;

    if (!usernameValue || !passwordValue) return message.warning(t("Login.Login.9034114-0"));

    setLoading(true);
    const res = await loginApi(usernameValue, passwordValue);

    setTimeout(() => {
      setLoading(false);
      if (res.code !== 200) return message.error(res.msg);

      setToken(res.data[0].user_id);
      sessionStorage.setItem("username", usernameValue);
      sessionStorage.setItem("userAvatar", res.data[0].user_avatar);
      dispatch({
        type: "SET_USER_AVATAR",
        payload: res.data[0].user_avatar,
      });
      notification.success({
        message: t("Login.Login.9034114-1"),
        description: t("Login.Login.9034114-2", [usernameValue]),
      });
      history.push("/");
    }, 1000);
  };

  const toRegistered = (e) => {
    e.preventDefault();
    Jump("/registered", history);
  };

  return (
    <MainBox>
      <BackGround>
        {/* <p>@ undatas.io</p> */}
        <div>
          <img src={logo} alt="" />
        </div>
        <div>
          <h1>UNDATAS.IO</h1>
          <p>{t("Login.Login.9034114-3")}</p>
        </div>
        <p>© 2024 MIND-COMPUTE AI</p>
      </BackGround>
      <Action>
        <LoginBox>
          <h1>
            <img src={logoIcon} alt="" />
            {t("Login.Login.9034114-4")}
          </h1>
          <h2>
            {t("Login.Login.9034114-5")}{" "}
            <a href="/#" onClick={toRegistered}>
              {t("Login.Login.9034114-6")}
            </a>
          </h2>
          <h2>{t("Login.Login.9034114-7")}</h2>
          <Divider plain>OR</Divider>
          <Input placeholder={t("Login.Login.9034114-8")} size="large" ref={username} />
          <Input
            placeholder={t("Login.Login.9034114-9")}
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
            {t("Login.Login.9034114-10")}
          </Button>
          <span>
            {t("Login.Login.272662-0")}
            {t("Login.Login.9034114-9")}？{" "}
            <a href="/#" onClick={(e) => e.preventDefault()}>
              {t("Login.Login.9034114-12")}
            </a>
          </span>
        </LoginBox>
      </Action>
      <LocaleButton />
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
    overflow: hidden;
    height: 100%;
  }
`;

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
    height: 48px;
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
      margin-left: 8px;
      font-style: italic;
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
  gap: 20px;
  font-style: italic;
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

export default Login;
