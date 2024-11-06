import React, { useEffect, useState } from "react";
import { Button, Radio } from "antd";
import styled from "styled-components";

function UpgradeTitle({ billingCycleChange }) {
  const [billingCycle, setBillingCycle] = useState("monthly");
  useEffect(() => {
    billingCycleChange(billingCycle);
  }, [billingCycle]);
  return (
    <UpgradeDrawerTitle>
      <span>UnDatasIO Pricing</span>
      <Radio.Group
        value={billingCycle}
        onChange={(e) => setBillingCycle(e.target.value)}
        buttonStyle="solid"
        style={{
          backgroundColor: "#f5f5f5",
          padding: "2px",
          borderRadius: "6px",
          height: "36px",
        }}
      >
        <Radio.Button
          value="monthly"
          style={{ height: "32px", minWidth: "70px", textAlign: "center", lineHeight: "32px" }}
        >
          {t("SideBarBody.SideBarBody.569446-0")}
        </Radio.Button>
        <Radio.Button
          value="annually"
          style={{ height: "32px", minWidth: "100px", textAlign: "center", lineHeight: "32px" }}
        >
          {t("SideBarBody.SideBarBody.569446-1")} ({t("SideBarBody.SideBarBody.569446-2")})
        </Radio.Button>
      </Radio.Group>
      <Button onClick={() => window.open("mailto:yuanhao.zhang@gmail.com")}>
        {t("SideBarBody.SideBarBody.569446-5")}
      </Button>
    </UpgradeDrawerTitle>
  );
}

const UpgradeDrawerTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default UpgradeTitle;
