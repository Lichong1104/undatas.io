import {
  ReadOutlined,
  DownloadOutlined,
  SettingOutlined,
  UploadOutlined,
  FileSearchOutlined,
  FilePdfOutlined,
  CheckCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Typography, Anchor } from "antd";
import React from "react";
import styled from "styled-components";
import { themeColor } from "@/theme/color";
import CodeBlock from "@/components/CodeBlock/CodeBlock";
import { sections } from "./apiData";

const { Title, Paragraph } = Typography;

function APIDocs() {
  const anchorItems = sections.map((section) => ({
    key: section.id,
    href: `#${section.id}`,
    title: (
      <NavItem>
        {getIcon(section.id)}
        <span>{section.title}</span>
      </NavItem>
    ),
  }));

  // 辅助函数用于返回对应的图标
  function getIcon(id) {
    const icons = {
      installation: <DownloadOutlined />,
      configuration: <SettingOutlined />,
      upload: <UploadOutlined />,
      "view-files": <FileSearchOutlined />,
      "parse-pdf": <FilePdfOutlined />,
      "view-results": <CheckCircleOutlined />,
      "view-version-information": <StarOutlined />,
    };
    return icons[id] || <ReadOutlined />;
  }

  return (
    <MainBox>
      <MyTitle>
        <ReadOutlined /> UnDatasIO API文档
      </MyTitle>

      {/* <AnchorContainer>
        <div className="nav-header">
          <ReadOutlined />
          <span>API 文档导航</span>
        </div>
        <Anchor items={anchorItems} offsetTop={80} targetOffset={80} affix={false} />
      </AnchorContainer> */}

      <Content className="custom-scroll">
        {sections.map((section) => (
          <Section key={section.id} id={section.id}>
            <Title level={3}>{section.title}</Title>
            {section.description && <Paragraph>{section.description}</Paragraph>}
            <CodeBlock pythonCode={section.code.python} jsonCode={section.code.json} />
          </Section>
        ))}
        <p>
          更多详细信息请参考
          <a href="https://undatasio.gitbook.io/undatasio-docs" target="_blank">
            UnDatasIO API文档
          </a>
        </p>
      </Content>
    </MainBox>
  );
}

const MainBox = styled.div`
  max-width: 1220px;
  margin: 0 auto;

  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const MyTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 20px;
  font-weight: 500;
`;

const AnchorContainer = styled.div`
  background: linear-gradient(135deg, #fff 0%, #f0f7ff 100%);
  padding: 16px 24px;
  border-radius: 8px;
  position: sticky;
  top: 0;
  z-index: 1;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  .nav-header {
    text-align: center;
    margin-bottom: 6px;
    color: ${themeColor.primary};
    font-size: 16px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    .anticon {
      font-size: 20px;
    }
  }

  .ant-anchor {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    gap: 12px;
    padding: 8px;

    .ant-anchor-link {
      flex: 1;
      min-width: 120px;
      padding: 0;

      .ant-anchor-link-title {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        display: block;
        padding: 8px 16px;
        border-radius: 8px;
        background: white;
        color: #666;
        transition: all 0.3s ease;
        border: 1px solid #f0f0f0;
        text-align: center;

        &:hover {
          color: ${themeColor.primary};
          background: #f0f7ff;
          border-color: ${themeColor.primary};
        }
      }

      &-active {
        .ant-anchor-link-title {
          color: ${themeColor.primary};
          background: #f0f7ff;
          border-color: ${themeColor.primary};
          font-weight: 500;
          box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
        }
      }
    }

    .ant-anchor-ink {
      display: none;
    }
  }
`;

const Content = styled.div`
  flex: 1;
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const Section = styled.div`
  margin-bottom: 48px;

  &:last-child {
    margin-bottom: 0;
  }

  .ant-typography {
    margin-bottom: 16px;
  }
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;

  .anticon {
    font-size: 16px;
    flex-shrink: 0;
  }

  span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: calc(100% - 24px);
  }
`;

export default APIDocs;
