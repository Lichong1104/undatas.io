import React from "react";
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import styled from "styled-components";
import { loginApi } from "@/api/httpApi";
import { App } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { setToken } from "@/utils/handleToken";
import { useDispatch } from "react-redux";

function GoogleLoginButton({ onLoading }) {
  const { message, notification } = App.useApp();
  const history = useHistory();
  const dispatch = useDispatch();

  // 登陆成功
  const onSuccess = async (response) => {
    onLoading(true);
    const { access_token } = response;
    const userInfoResponse = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`);
    const userInfo = await userInfoResponse.json();

    const res = await loginApi(userInfo.email, "", userInfo.picture);
    onLoading(false);

    if (res.code !== 200) return message.error(res.msg);
    setToken(res.data[0].user_id);
    localStorage.setItem("username", userInfo.email);
    localStorage.setItem("userAvatar", res.data[0].user_avatar);
    dispatch({
      type: "SET_USER_AVATAR",
      payload: res.data[0].user_avatar,
    });

    notification.success({
      message: t("Login.Login.9034114-1"),
      description: t("Login.Login.9034114-2"),
    });
    history.push("/");
  };

  // 登陆失败
  const onError = () => {
    console.error(t("MyGoogleLogin.MyGoogleLogin.015430-0"));
    onLoading(false);
  };

  // 登录
  const login = useGoogleLogin({
    onSuccess: onSuccess,
    onError: onError,
  });

  return (
    <MainBox onClick={login}>
      <GoogleIcon>
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="LgbsSe-Bz112c">
          <g>
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            ></path>
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            ></path>
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            ></path>
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            ></path>
            <path fill="none" d="M0 0h48v48H0z"></path>
          </g>
        </svg>
      </GoogleIcon>
      <ButtonText>{t("MyGoogleLogin.MyGoogleLogin.015430-1")}</ButtonText>
    </MainBox>
  );
}

function MyGoogleLogin({ onLoading }) {
  return (
    <GoogleOAuthProvider clientId="393836037822-4bb04nk8dqrtnrr9dn7f14hi19m3rjto.apps.googleusercontent.com">
      <GoogleLoginButton onLoading={onLoading} />
    </GoogleOAuthProvider>
  );
}

export default MyGoogleLogin;

const MainBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid #dadce0;
  border-radius: 10px;
  background-color: #fff;
  transition: background-color 0.3s;
  &:hover {
    background-color: #f8f9fa;
  }
`;

const GoogleIcon = styled.div`
  width: 20px;
  height: 20px;
  margin-right: 24px;
`;

const ButtonText = styled.span`
  font-family: "Google Sans", Roboto, Arial, sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #3c4043;
`;
