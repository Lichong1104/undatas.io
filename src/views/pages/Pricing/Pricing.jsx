import React from "react";
import styled from "styled-components";
import PricingCard from "../../../components/PricingCard/PricingCard";
import { GlobalOutlined, SmileOutlined, StarOutlined } from "@ant-design/icons";
import { getToken } from "../../../utils/handleToken";

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  padding-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Pricing = ({ billingCycle }) => {
  const pricingData = [
    {
      title: "Free Plan",
      icon: <GlobalOutlined />,
      description: "Best for personal, open source, and research. Explore public projects on Roboflow Universe.",
      price: "Free",
      buttonText: "Free Plan",
      buttonUrl: "#",
      isCurrentPlan: true,
      datasetType: {
        type: "public",
        text: "for the community to use.",
      },
      includedFeatures: [
        { text: "1,000 credit per week to get started", subText: "maximum" },
        { text: "Automatically save uploaded files for 30 days The analysis results will be automatically" },
        { text: "Priority technical support, quick response to your questions" },
        { text: "API interface access permission, easily integrate DatasIO into your workflow" },
      ],
      keyFeatures: {
        title: "In Public Plan:",
        features: ["Advanced ML Labeling Tools", "Model Training", "Legacy GPUs", "Workflow Builder"],
      },
    },
    {
      title: "Basic Plan",
      icon: <StarOutlined />,
      description: "Best for personal, open source, and research. Explore public projects on Roboflow Universe.",
      price: billingCycle === "monthly" ? "$99" : "$79",
      buttonText: "Upgrade to Basic Plan",
      buttonUrl:
        billingCycle === "monthly"
          ? `https://buy.stripe.com/8wM4hXaIud8I9mE4gl?client_reference_id=${getToken()}`
          : `https://buy.stripe.com/9AQ15L17U4CcgP6fZ2?client_reference_id=${getToken()}`,
      isCurrentPlan: false,
      datasetType: {
        type: "private",
        text: "for your own use.",
      },
      includedFeatures: [
        { text: "A total of 25000 credit per month" },
        { text: "Upload files and permanently save them" },
        { text: "Save the parsing results permanently" },
        { text: "Priority technical support, quick response to your questions" },
        { text: "API interface access permission, easily integrate DatasIO into your workflow" },
      ],
      keyFeatures: {
        title: "In Basic Plan:",
        features: ["Access to Outsourced Labeling", "Premium GPUs", "Commercial Model Licensing", "Model Evaluation"],
      },
    },
    {
      title: "Pro Plan",
      icon: <SmileOutlined />,
      description: "Best for personal, open source, and research. Explore public projects on Roboflow Universe.",
      price: billingCycle === "monthly" ? "$189" : "$149",
      buttonText: "Upgrade to Pro Plan",
      buttonUrl:
        billingCycle === "monthly"
          ? `https://buy.stripe.com/3cs3dT9Eq1q09mE7st?client_reference_id=${getToken()}`
          : `https://buy.stripe.com/4gw8yd6sefgQ7ew8wy?client_reference_id=${getToken()}`,
      isCurrentPlan: false,
      datasetType: {
        type: "private",
        text: "for your own use.",
      },
      includedFeatures: [
        { text: "A total of 50000 credit per month" },
        { text: "Upload files and permanently save them" },
        { text: "Save the parsing results permanently" },
        { text: "Priority technical support, quick response to your questions" },
        { text: "API interface access permission, easily integrate DatasIO into your workflow" },
      ],
      keyFeatures: {
        title: "In Pro Plan:",
        features: [
          "Role Based Access Control (RBAC)",
          "Project Folders",
          "Enterprise Workflow Blocks",
          "Offline Deployments",
        ],
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

export default Pricing;
