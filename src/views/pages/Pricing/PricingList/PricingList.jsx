import React from "react";
import styled from "styled-components";
import PricingCard from "../../../../components/PricingCard/PricingCard";
import { GlobalOutlined, SmileOutlined, StarOutlined } from "@ant-design/icons";
import { getToken } from "../../../../utils/handleToken";
import { useSelector } from "react-redux";
import { Space } from "antd";

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  padding-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const PricingList = ({ billingCycle }) => {
  const { userPay, userDesc } = useSelector((state) => state.user.userInfo);
  const pricingData = [
    {
      title: userDesc === "0" ? "Basic Plan (Free Trial)" : "Basic Plan",
      icon: <StarOutlined />,
      description:
        userDesc === "0"
          ? "Please add a credit or debit card. By doing so, you will enjoy seamless access to our features and services."
          : "Designed for regular parsing tasks in both internal and external projects. Great for growing businesses.",
      price:
        billingCycle === "monthly" ? (
          userDesc === "0" ? (
            <Space size="middle">
              $0
              <PriceStyle> {billingCycle === "monthly" ? "$99" : "$79"}</PriceStyle>
            </Space>
          ) : (
            "$99"
          )
        ) : (
          "$79"
        ),
      billingCycle: billingCycle === "monthly" ? "Billed Monthly" : "Billed Annually",
      buttonText: userDesc === "0" ? "Start Free Trial" : "Upgrade to Basic Plan",
      buttonUrl:
        billingCycle === "monthly"
          ? userDesc === "0"
            ? `https://buy.stripe.com/aEU01H03Q6KkcyQfZ6?client_reference_id=${getToken()}`
            : `https://buy.stripe.com/8wM4hXaIud8I9mE4gl?client_reference_id=${getToken()}`
          : `https://buy.stripe.com/9AQ15L17U4CcgP6fZ2?client_reference_id=${getToken()}`,
      disabled: userPay === "basic" ? true : false,
      datasetType:
        userDesc === "0"
          ? {
              type: "",
              text: "Enjoy 1000 credits for free for trial period",
            }
          : {
              type: "indefinitely",
              text: "The dataset will be stored",
            },
      includedFeatures: [
        { text: `Includes ${userDesc === "0" ? "1000" : "25000"} credits per month to get started` },
        { text: "Save user files permanently" },
        { text: "API interface access permission, easily integrate UnDatasIO into your workflow" },
      ],
      keyFeatures: {
        title: "In Basic Plan:",
        features: [
          "Document parse (PDF, DOCX, PPTX, JPG, PNG)",
          "Complex Table parse ",
          "Video Audio(mp3, mp4, w4a) parse",
        ],
      },
    },
    {
      title: "Pro Plan",
      icon: <SmileOutlined />,
      description: "Advanced solution for large-scale parsing tasks in both internal and external enterprise projects.",
      price: billingCycle === "monthly" ? "$189" : "$149",
      billingCycle: billingCycle === "monthly" ? "Billed Monthly" : "Billed Annually",
      buttonText: "Upgrade to Pro Plan",
      buttonUrl:
        billingCycle === "monthly"
          ? `https://buy.stripe.com/3cs3dT9Eq1q09mE7st?client_reference_id=${getToken()}`
          : `https://buy.stripe.com/4gw8yd6sefgQ7ew8wy?client_reference_id=${getToken()}`,
      disabled: userPay === "pro" ? true : false,
      datasetType: {
        type: "indefinitely",
        text: " The dataset will be stored",
      },
      includedFeatures: [
        { text: "Includes 50000 credits per month to get started" },
        { text: "Save user files permanently" },
        { text: "API interface access permission, easily integrate UnDatasIO into your workflow" },
      ],
      keyFeatures: {
        title: "In Pro Plan:",
        features: [
          "Document parse (PDF, DOCX, PPTX, JPG, PNG)",
          "Complex Table parse ",
          "Video Audio(mp3, mp4, w4a) parse",
        ],
      },
    },
    {
      title: "Pay As You Go",
      icon: <GlobalOutlined />,
      description:
        "Purchased credits expire on next subscription date. Please purchase reasonable credits to avoid waste",
      price: "$30",
      billingCycle: "Subscribe first before purchasing Pay As You Go",
      buttonText: "Buy Credits",
      buttonUrl: `https://buy.stripe.com/9AQaGl2bYc4EdCU7sy?client_reference_id=${getToken()}`,
      disabled: userPay !== "free" ? false : true,
      datasetType: {
        type: "for one month",
        text: " The dataset will be stored",
      },
      // 帮我改成先判断userDesc是否等于0，如果等于0就显示
      includedFeatures: [
        { text: "Start with 6000 one-time credits", subText: "maximum" },
        { text: "Metered Billing" },
        { text: "Consumption-Based Pricing" },
      ],
      keyFeatures: {
        title: "In Public Plan:",
        features: ["Tailored for enterprise clients", "Pay Only for What You Use"],
      },
    },
  ];

  return (
    <PricingGrid>
      {pricingData.map((plan, index) => (
        <PricingCard key={index} {...plan} />
      ))}
    </PricingGrid>
  );
};

// 价格样式
const PriceStyle = styled.span`
  text-decoration: line-through;
  font-weight: 100;
`;

export default PricingList;
