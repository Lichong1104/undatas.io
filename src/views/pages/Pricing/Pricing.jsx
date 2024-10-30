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
      description:
        "Perfect for beginners and open-source projects. Ideal for testing and exploring our parsing capabilities.",
      price: "Free",
      billingCycle: "No credit card needed.",
      buttonText: "Free Plan",
      buttonUrl: "#",
      isCurrentPlan: true,
      datasetType: {
        type: "public",
        text: "for the community to use.",
      },
      includedFeatures: [
        { text: "Includes 1000 credits per week to get started", subText: "maximum" },
        { text: "Save user files for 30 days" },
        { text: "API interface access permission, easily integrate UnDatasIO into your workflow" },
      ],
      keyFeatures: {
        title: "In Public Plan:",
        features: ["Document parse (PDF, DOCX, PPTX, JPG, PNG)"],
      },
    },
    {
      title: "Basic Plan",
      icon: <StarOutlined />,
      description:
        "Designed for regular parsing tasks in both internal and external projects. Great for growing businesses.",
      price: billingCycle === "monthly" ? "$99" : "$79",
      billingCycle: "per month, billed monthly",
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
        { text: "Includes 25000 credits per month to get started" },
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
      billingCycle: "Billed Annually",
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
