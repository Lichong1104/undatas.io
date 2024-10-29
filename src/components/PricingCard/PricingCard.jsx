import React from "react";
import {
  CardWrapper,
  Header,
  Title,
  Description,
  PriceSection,
  Price,
  BillingCycle,
  Button,
  DatasetType,
  DatasetTypeText,
  SectionTitle,
  FeatureList,
  FeatureItem,
} from "./styled";

const PricingCard = ({
  title,
  icon,
  description,
  price,
  billingCycle,
  buttonText,
  isCurrentPlan,
  datasetType,
  includedFeatures,
  keyFeatures,
  buttonUrl,
}) => {
  return (
    <CardWrapper $isCurrentPlan={isCurrentPlan}>
      <Header $isCurrentPlan={isCurrentPlan}>
        <span>{icon}</span>
        <Title>{title}</Title>
      </Header>

      <Description>{description}</Description>

      <PriceSection>
        <Price>{price}</Price>
        {billingCycle && <BillingCycle>{billingCycle}</BillingCycle>}
      </PriceSection>
      <a href={buttonUrl} onClick={(e) => (isCurrentPlan ? e.preventDefault() : null)} rel="noreferrer">
        <Button $isCurrentPlan={isCurrentPlan}>{buttonText}</Button>{" "}
      </a>

      <DatasetType>
        <span>{datasetType.type === "public" ? "🌐" : "🔒"}</span>
        <DatasetTypeText $isPublic={datasetType.type === "public"}>
          Datasets and models are <span>{datasetType.type}</span> {datasetType.text}
        </DatasetTypeText>
      </DatasetType>

      <div>
        <SectionTitle>What's Included:</SectionTitle>
        <FeatureList>
          {includedFeatures.map((feature, index) => (
            <FeatureItem key={index}>
              <span className="checkmark">✓</span>
              <span>
                {feature.text}
                {/* {feature.subText && <span className="subtext"> {feature.subText}</span>} */}
              </span>
            </FeatureItem>
          ))}
        </FeatureList>
      </div>

      <div>
        <SectionTitle>Key Features:</SectionTitle>
        <Description>{keyFeatures.title}</Description>
        <FeatureList>
          {keyFeatures.features.map((feature, index) => (
            <FeatureItem key={index}>
              <span className="checkmark">✓</span>
              <span>{feature}</span>
            </FeatureItem>
          ))}
        </FeatureList>
      </div>
    </CardWrapper>
  );
};

export default PricingCard;
