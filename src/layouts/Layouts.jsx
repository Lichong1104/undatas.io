import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";

import "./Layout.scss";

import SideBar from "./SideBar/SideBar";
import BodyContent from "./BodyContent/BodyContent";
import HeaderContent from "./HeadContent/HeaderContent";
import { getUserInfo } from "../utils/tools";
import PageLoading from "../components/PageLoading/PageLoading";
import { useDispatch } from "react-redux";

function Layouts() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const blackList = ["/create-project", "/work-settings", "/data-center"];
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const userInfo = await getUserInfo(dispatch);
      if (userInfo.balance <= 0) history.push("/pricing");
      setLoading(false);
    })();
  }, []);

  return (
    <>
      {loading ? (
        <PageLoading />
      ) : (
        <Layout>
          <Layout>
            <HeaderContent />
            <Layout hasSider>
              {blackList.includes(location.pathname) ? "" : <SideBar />}
              <BodyContent />
            </Layout>
          </Layout>
        </Layout>
      )}
    </>
  );
}

export default Layouts;
