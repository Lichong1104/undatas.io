import { ArrowLeftOutlined, CopyOutlined } from "@ant-design/icons";
import { App, Button, Empty, Space, Typography } from "antd";
import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import copy from "copy-to-clipboard";

const { Title, Text } = Typography;

function APIKeys() {
  const { message } = App.useApp();
  const history = useHistory();
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  // 复制 token
  const copyToken = () => {
    copy(token);
    message.success(t("APIKeys.APIKeys.7183127-0"));
  };

  return (
    <MainBox>
      <Title level={3}>
        <Space size="large">
          <ArrowLeftOutlined style={{ fontSize: 18, cursor: "pointer" }} onClick={() => history.push("/project")} />
          <span>{username} API Keys</span>
        </Space>
      </Title>

      <Title level={4} style={{ fontWeight: 500 }}>
        API Keys API
      </Title>
      <Text style={{ color: "gray" }}>
        {t("APIKeys.APIKeys.7183127-1")}
        {t("APIKeys.APIKeys.7183127-2")}
      </Text>

      <Title level={5} style={{ fontWeight: 500, marginTop: 28 }}>
        {t("APIKeys.APIKeys.7183127-3")}
      </Title>
      <Text style={{ color: "gray" }}>{t("APIKeys.APIKeys.7183127-4")}</Text>

      <APIKeyBox>
        <span>{token}</span>
        <Button size="small" onClick={copyToken}>
          <CopyOutlined />
        </Button>
      </APIKeyBox>

      <Title level={5} style={{ fontWeight: 500, marginTop: 28 }}>
        {t("APIKeys.APIKeys.7183127-5")}
      </Title>
      <Text style={{ color: "gray" }}>{t("APIKeys.APIKeys.7183127-6")}</Text>
      <Empty />
    </MainBox>
  );
}

const MainBox = styled.div`
  max-width: 880px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const APIKeyBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px 0;
  background-color: #f9fafb;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

export default APIKeys;
