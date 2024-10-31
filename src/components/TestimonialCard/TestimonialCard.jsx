import React from "react";
import { Avatar, Typography } from "antd";
import styled from "styled-components";

const { Title, Text, Paragraph } = Typography;

const CardWrapper = styled.div`
  border-radius: 12px;
  background: #ffffff00;
  color: white;
`;

const TestimonialHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const StyledAvatar = styled(Avatar)`
  margin-right: 16px;
  img {
    width: 100%;
    height: 100% !important;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  .ant-typography {
    margin: 0;
    &.ant-typography-secondary {
      font-size: 14px;
    }
  }

  h4.ant-typography {
    margin-bottom: 4px;
  }
`;

const StyledParagraph = styled(Paragraph)`
  font-size: 14px;
  line-height: 1.6;
  color: #f5f5f5ba;
  margin-bottom: 0 !important;
`;

function TestimonialCard({ title, role, avatar, content }) {
  return (
    <CardWrapper>
      <TestimonialHeader>
        <StyledAvatar size={54} src={avatar} />
        <UserInfo>
          <Title style={{ color: "white" }} level={4}>
            {title}
          </Title>
          <Text style={{ color: "#f5f5f5ba" }} type="secondary">
            {role}
          </Text>
        </UserInfo>
      </TestimonialHeader>
      <StyledParagraph>{content}</StyledParagraph>
    </CardWrapper>
  );
}

export default TestimonialCard;
