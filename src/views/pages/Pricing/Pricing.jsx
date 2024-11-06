import React, { useState } from "react";
import PricingList from "./PricingList/PricingList";
import UpgradeTitle from "../../../components/UpgradeTitle/UpgradeTitle";
import { Space } from "antd";

function Pricing() {
  // 选择计费周期
  const [billingCycle, setBillingCycle] = useState("monthly");
  return (
    <Space direction="vertical" size={24}>
      <UpgradeTitle billingCycleChange={setBillingCycle} />
      <PricingList billingCycle={billingCycle} />
    </Space>
  );
}

export default Pricing;
