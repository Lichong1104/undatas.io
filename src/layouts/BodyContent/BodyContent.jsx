import React from "react";
import PageRouter from "@/router/PageRouter";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import UploadFloat from "@/components/UploadFloat/UploadFloat";

function BodyContent() {
  const location = useLocation();
  const whiteList = [
    "/project",
    "/data-center",
    "/create-project",
    "/work-settings",
    "/user-info/usage",
    "/user-info/api-keys",
    "/pricing",
  ];

  return (
    <div
      className="bodyContent custom-scroll"
      style={{ backgroundColor: whiteList.includes(location.pathname) ? "white" : "#F3F4F6" }}
    >
      {whiteList.includes(location.pathname) ? undefined : <UploadFloat />}
      <PageRouter />
    </div>
  );
}

export default BodyContent;
