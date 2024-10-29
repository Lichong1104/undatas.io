import styled from "styled-components";
import { themeColor } from "../../theme/color";

export const CardWrapper = styled.div`
  border: ${(props) => (props.$isCurrentPlan ? "1px solid #e5e7eb" : `1px solid ${themeColor.primary}`)};
  border-radius: 8px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
  font-weight: 500;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  span {
    font-size: 20px;
    color: ${(props) => (!props.$isCurrentPlan ? `${themeColor.primary}` : "#6b7280")};
  }
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin: 0;
`;

export const Description = styled.p`
  color: #6b7280;
  margin-bottom: 16px;
`;

export const PriceSection = styled.div`
  margin-bottom: 24px;
`;

export const Price = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

export const BillingCycle = styled.div`
  color: #6b7280;
  font-size: 14px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: none;
  cursor: ${(props) => (props.$isCurrentPlan ? "not-allowed" : "pointer")};
  font-weight: 600;
  font-size: 14px;
  transition: all 0.3s ease;
  a {
    text-decoration: none;
    width: 100%;
    display: block;
    height: 100%;
    color: inherit;
  }
  ${(props) =>
    props.$isCurrentPlan
      ? `
    background-color: #f3f4f6;
    color: #374151;
  `
      : `
    background-color: #fbbf24;
    &:hover {
      background-color: #f59e0b;
    }
  `}
`;

export const DatasetType = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 16px 0;
  border-bottom: 1px solid #e5e7eb;
  border-top: 1px solid #e5e7eb;
  padding: 24px 0;
`;

export const DatasetTypeText = styled.span`
  span {
    color: ${(props) => (props.$isPublic ? `${themeColor.primary}` : "#7c3aed")};
    font-weight: 700;
  }
`;

export const SectionTitle = styled.h3`
  font-weight: 600;
  margin-bottom: 8px;
`;

export const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;

  .checkmark {
    color: #7c3aed;
  }

  .subtext {
    color: #6b7280;
    font-size: 14px;
  }
`;
