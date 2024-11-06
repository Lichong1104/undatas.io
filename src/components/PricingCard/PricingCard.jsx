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
  disabled,
  datasetType,
  includedFeatures,
  keyFeatures,
  buttonUrl,
}) => {
  return (
    <CardWrapper $disabled={disabled}>
      <Header $disabled={disabled}>
        <span>{icon}</span>
        <Title>{title}</Title>
      </Header>

      <Description>{description}</Description>

      <PriceSection>
        <Price>{price}</Price>
        {billingCycle && <BillingCycle>{billingCycle}</BillingCycle>}
      </PriceSection>
      <a href={disabled ? "#" : buttonUrl} onClick={(e) => (disabled ? e.preventDefault() : null)} rel="noreferrer">
        <Button $disabled={disabled}>{buttonText}</Button>{" "}
      </a>

      <DatasetType>
        <span>{datasetType.type === "for one month" ? "🌐" : "🔒"}</span>
        <DatasetTypeText $isPublic={datasetType?.type === "public"}>
          {datasetType?.text} <span>{datasetType?.type}</span>
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
