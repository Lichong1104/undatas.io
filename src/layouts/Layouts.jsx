import React from "react";
import { Layout } from "antd";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

import "./Layout.scss";

import SideBar from "./SideBar/SideBar";
import BodyContent from "./BodyContent/BodyContent";
import HeaderContent from "./HeadContent/HeaderContent";

function Layouts() {
  const location = useLocation();
  const blackList = ["/create-project", "/work-settings", "/data-center"];

  return (
    <Layout>
      <Layout>
        <HeaderContent />
        <Layout hasSider>
          {blackList.includes(location.pathname) ? "" : <SideBar />}
          <BodyContent />
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Layouts;
