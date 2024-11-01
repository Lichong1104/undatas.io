import React, { useState } from "react";
import { Button, Drawer, Radio, Tooltip } from "antd";
import {
  ToTopOutlined,
  CloseOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import Pricing from "../../views/pages/Pricing/Pricing";
import styled from "styled-components";
import { themeColor } from "../../theme/color";

function SideBarBody({ collapsed }) {
  const dispatch = useDispatch();

  // {t('SideBarBody.SideBarBody.569446-4')}
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const clickUpgrade = () => {
    setOpen(true);
  };

  const [billingCycle, setBillingCycle] = useState("monthly");

  const UpgradeTitle = (
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
      <Button onClick={() => window.open("https://undatas.io")}>{t("SideBarBody.SideBarBody.569446-5")}</Button>
    </UpgradeDrawerTitle>
  );

  return (
    <MainBox>
      <UpgradeButton>
        <Button
          style={{ width: "100%" }}
          icon={<FileDoneOutlined />}
          onClick={() => window.open("https://undatasio.gitbook.io/undatasio-docs")}
        >
          {collapsed ? "" : t("SideBarBody.SideBarBody.356940-0")}
        </Button>
        <Button type="primary" icon={<ToTopOutlined />} onClick={clickUpgrade}>
          {collapsed ? "" : t("SideBarBody.SideBarBody.569446-4")}
        </Button>
      </UpgradeButton>

      <Drawer
        className="upgradeDrawer"
        extra={<CloseOutlined style={{ position: "absolute", right: "10px", top: "20px" }} onClick={onClose} />}
        title={UpgradeTitle}
        closeIcon={false}
        open={open}
        placement="top"
        height="100%"
        onClose={onClose}
      >
        <div className="custom-scroll" style={{ height: "100%", padding: "0 100px" }}>
          <Pricing billingCycle={billingCycle} />
        </div>
      </Drawer>

      <div className="collapsed" onClick={() => dispatch({ type: collapsed ? "COLLAPSED/FALSE" : "COLLAPSED/TRUE" })}>
        {collapsed ? (
          <Tooltip title={t("SideBar.SideBar.7725620-0")}>
            <MenuUnfoldOutlined />
          </Tooltip>
        ) : (
          <Tooltip title={t("SideBar.SideBar.7725620-1")}>
            <MenuFoldOutlined />
          </Tooltip>
        )}
      </div>
    </MainBox>
  );
}

const MainBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const ComingSoon = styled.div`
  width: 100%;
  padding: 10px;
  background-color: orange;
  color: #fff;
  border-radius: 4px;
  font-size: 16px;
`;

const UpgradeButton = styled.div`
  width: 100%;
  /* position: absolute; */
  bottom: 50px;
  padding: 0 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  button:nth-of-type(2) {
    width: 100%;
    height: 100%;
    background-color: #d4c9f8;
    color: ${themeColor.primary};
    border-radius: 4px;
    font-size: 16px;
  }
`;

const UpgradeDrawerTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default SideBarBody;
