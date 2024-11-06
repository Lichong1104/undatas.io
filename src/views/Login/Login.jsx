import React, { useEffect, useRef, useState } from "react";
import { setToken } from "@/utils/handleToken";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import loginImg from "@/image/login.png";
import { App, Button, Carousel, Checkbox, Divider, Input, Space } from "antd";
import { loginApi, sendEmailCodeApi } from "@/api/httpApi";
import logoIcon from "@/image/logo.png";
import logo from "@/image/undatas-logo.png";
import LocaleButton from "@/components/LocaleButton/LocaleButton";
import { useDispatch } from "react-redux";
import MyGoogleLogin from "@/components/MyGoogleLogin/MyGoogleLogin";
import TestimonialCard from "../../components/TestimonialCard/TestimonialCard";

function Login() {
  const history = useHistory();
  const { message, notification } = App.useApp();
  const dispatch = useDispatch();

  // 邮箱登录
  const emailRef = useRef(null);
  const verificationCode = useRef(null);
  const [isSendCode, setIsSendCode] = useState(false);
  const [codeLoading, setCodeLoading] = useState(false);

  const [loginLoading, setLoginLoading] = useState(false);

  // {t('Login.Login.371948-2')}勾选状态
  const [isAgreePolicy, setIsAgreePolicy] = useState(false);

  useEffect(() => {
    console.log(isAgreePolicy);
  }, [isAgreePolicy]);

  // 发送邮箱验证码
  const sendEmailCode = async () => {
    setCodeLoading(true);
    const res = await sendEmailCodeApi(emailRef.current.input.value).finally(() => setCodeLoading(false));
    if (res.code !== 200) return message.error(res.msg);
    setIsSendCode(true);
    message.success(t("Login.Login.554723-0"));
  };

  // 登录
  const login = async () => {
    if (!isAgreePolicy) return message.warning(t("Login.Login.371948-0"));
    const emailValue = emailRef.current.input.value;
    const verificationCodeValue = verificationCode.current.input.value;
    if (!emailValue || !verificationCodeValue) return message.warning(t("Login.Login.554723-1"));

    setLoginLoading(true);
    const res = await loginApi(emailValue, verificationCodeValue, "");
    setLoginLoading(false);
    if (res.code !== 200) return message.error(res.msg);

    setToken(res.data[0].user_id);
    localStorage.setItem("username", emailValue);
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

  // testimonial
  const testimonialData = [
    {
      title: "George Yuan",
      role: "Director at Deloitte China",
      avatar: "https://fquantplus.oss-cn-qingdao.aliyuncs.com/undataParser/testimonial_avatar/1.png",
      content:
        "UndatasIO has not only saved me countless hours, but it has also given me the confidence to make more accurate and data-driven decisions. I highly recommend this platform to anyone in the financial sector looking to gain a competitive edge in today's data-driven world.",
    },
    {
      title: "Jacky Tang",
      role: "Zurich Insurance China - Chief Risk Officer",
      avatar: "https://fquantplus.oss-cn-qingdao.aliyuncs.com/undataParser/testimonial_avatar/2.png",
      content:
        "UndatasIO efficiently processes vast amounts of data, including unstructured information, which previously took immense time and effort. Now, I can quickly identify emerging risks, analyze market trends, and gain a deeper understanding of potential vulnerabilities within our operations.",
    },
    {
      title: "Dr Jiong Zhou",
      role: "Executive Director, Risk Methodology at Nomura",
      avatar: "https://fquantplus.oss-cn-qingdao.aliyuncs.com/undataParser/testimonial_avatar/3.png",
      content:
        "UndatasIO effortlessly handles the complexities of unstructured data, saving me countless hours that were previously spent on data wrangling. This allows me to focus on the analysis itself, extracting valuable insights and making more strategic decisions.",
    },
  ];

  return (
    <MainBox>
      <BackGround>
        <div>
          <img src={logo} alt="" />
        </div>
        <div>
          <h1>UNDATAS.IO</h1>
          <p>{t("Login.Login.9034114-3")}</p>
        </div>
        <Carousel autoplay dots={false} autoplaySpeed={5000}>
          {testimonialData.map((v) => {
            return (
              <TestimonialCard key={v.title} title={v.title} role={v.role} avatar={v.avatar} content={v.content} />
            );
          })}
        </Carousel>
        <p>© 2024 UNDATAS.IO</p>
      </BackGround>
      <Action>
        <LoginBox>
          <h1>
            <img src={logoIcon} alt="" />
            {t("Login.Login.9034114-4")}
          </h1>
          <h2>{t("Login.Login.554723-2")}</h2>
          <MyGoogleLogin onLoading={(v) => setLoginLoading(v)} isAgreePolicy={isAgreePolicy} />
          <Divider plain style={{ margin: 4 }}>
            OR
          </Divider>
          <Space direction="vertical" size={12} style={{ width: "100%" }}>
            <Input placeholder={t("Login.Login.554723-3")} size="large" ref={emailRef} />
            <CodeCom>
              <Input placeholder={t("Login.Login.554723-4")} size="large" ref={verificationCode} />
              <Button
                size="large"
                type="primary"
                disabled={isSendCode}
                onClick={sendEmailCode}
                loading={codeLoading}
                style={{ margin: 0, height: 50, width: "60%" }}
              >
                {!isSendCode ? t("Login.Login.554723-5") : t("Login.Login.554723-6")}
              </Button>
            </CodeCom>
            <Button
              size="large"
              type="primary"
              style={{ height: "50px", fontSize: "20px" }}
              onClick={login}
              loading={loginLoading}
            >
              {t("Login.Login.9034114-10")}
            </Button>

            <CheckboxCom>
              <Checkbox
                style={{
                  fontSize: 14,
                  transform: "scale(0.9)",
                  transformOrigin: "right",
                }}
                onChange={(e) => setIsAgreePolicy(e.target.checked)}
              >
                {t("Login.Login.371948-1")}{" "}
                <a href="https://privacy-policy.undatas.io" target="_blank">
                  {t("Login.Login.371948-2")}
                </a>{" "}
                {t("Login.Login.371948-3")}{" "}
                <a href="https://subscription-terms.undatas.io/" target="_blank">
                  {t("Login.Login.371948-4")}
                </a>
              </Checkbox>
            </CheckboxCom>
          </Space>
          <span>
            {t("Login.Login.554723-7")}{" "}
            <a href="https://privacy-policy.undatas.io" target="_blank">
              {t("Login.Login.554723-8")}
            </a>
            {t("Login.Login.554723-9")}
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
      /* margin-top: -300px; */
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
    font-size: 12px;
    color: #808080c3;
  }
`;

const CodeCom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 12px;
`;

const CheckboxCom = styled.div`
  font-size: 12px;
  display: flex;
  justify-content: flex-end;
`;

export default Login;
