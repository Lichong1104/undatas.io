import { List } from "antd";
import React from "react";
import styled from "styled-components";

const passwordStrength = {
  strong: <span className="strong">{t("SecurityView.SecurityView.7183019-0")}</span>,
  medium: <span className="medium">{t("SecurityView.SecurityView.7183019-1")}</span>,
  weak: <span className="weak">{t("SecurityView.SecurityView.7183019-2")}</span>,
};

const Container = styled.div`
  .strong {
    color: green;
  }
  .medium {
    color: orange;
  }
  .weak {
    color: red;
  }
`;

const SecurityView = () => {
  const getData = () => [
    {
      title: t("SecurityView.SecurityView.7183019-3"),
      description: (
        <>
          当前密码{t("SecurityView.SecurityView.7183019-0")}度：{passwordStrength.strong}
        </>
      ),
      actions: [<a key="Modify">{t("SecurityView.SecurityView.7183019-5")}</a>],
    },
    {
      title: t("SecurityView.SecurityView.7183019-6"),
      description: t("SecurityView.SecurityView.7183019-7"),
      actions: [<a key="Modify">{t("SecurityView.SecurityView.7183019-5")}</a>],
    },
    {
      title: t("SecurityView.SecurityView.7183019-8"),
      description: t("SecurityView.SecurityView.7183019-9"),
      actions: [<a key="Set">{t("SecurityView.SecurityView.7183019-10")}</a>],
    },
    {
      title: t("SecurityView.SecurityView.7183019-11"),
      description: t("SecurityView.SecurityView.7183019-12"),
      actions: [<a key="Modify">{t("SecurityView.SecurityView.7183019-5")}</a>],
    },
    // {
    //   title: t("SecurityView.SecurityView.7183019-13"),
    //   description: t("SecurityView.SecurityView.7183019-14"),
    //   actions: [<a key="bind">{t("SecurityView.SecurityView.7183019-15")}</a>],
    // },
  ];

  const data = getData();
  return (
    <Container>
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item actions={item.actions}>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </Container>
  );
};

export default SecurityView;
