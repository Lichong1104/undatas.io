import React, { useState } from "react";
import { Tabs } from "antd";
import { CopyOutlined, CheckOutlined } from "@ant-design/icons";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import styled from "styled-components";
import copy from "copy-to-clipboard";

const CodeBlock = ({ pythonCode, jsonCode }) => {
  const [copyStatus, setCopyStatus] = useState({
    python: false,
    json: false,
  });

  const copyToClipboard = (code, type) => {
    copy(code);
    setCopyStatus((prev) => ({ ...prev, [type]: true }));

    // 3秒后恢复原始图标
    setTimeout(() => {
      setCopyStatus((prev) => ({ ...prev, [type]: false }));
    }, 3000);
  };

  const renderCodePane = (code, language) => (
    <CodeContainer>
      <CopyButton onClick={() => copyToClipboard(code, language)} className={copyStatus[language] ? "copied" : ""}>
        {copyStatus[language] ? <CheckOutlined /> : <CopyOutlined />}
      </CopyButton>
      <SyntaxHighlighter
        language={language}
        style={docco}
        customStyle={{
          margin: 0,
          padding: "16px",
          borderRadius: "4px",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </CodeContainer>
  );

  const items = [
    {
      key: "python",
      label: "Python",
      children: renderCodePane(pythonCode, "python"),
    },
    ...(jsonCode
      ? [
          {
            key: "json",
            label: "Web Service",
            children: renderCodePane(jsonCode, "json"),
          },
        ]
      : []),
  ];

  return (
    <CodeBlockWrapper>
      <Tabs type="card" defaultActiveKey="python" items={items} />
    </CodeBlockWrapper>
  );
};

const CodeBlockWrapper = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

  .ant-tabs-nav {
    margin-bottom: 0;
  }

  .ant-tabs-tab {
    // 默认使用 antd 的颜色
  }

  .ant-tabs-tab-active {
    background: #f8f8ff !important;
  }

  .ant-tabs-content-holder {
    background: #f8f8ff;
  }
`;

const CodeContainer = styled.div`
  position: relative;
`;

const CopyButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 1;
  padding: 4px 8px;
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  cursor: pointer;
  opacity: 0.8;
  transition: all 0.3s;

  &:hover {
    opacity: 1;
    background: #f5f5f5;
  }

  &.copied {
    color: #52c41a;
    border-color: #52c41a;
    background: #f6ffed;
  }
`;

export default CodeBlock;
