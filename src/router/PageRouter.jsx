import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PageLoading from "@/components/PageLoading/PageLoading";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min.js";
import { useSelector } from "react-redux";

// 定价
const Pricing = lazy(() => import("../views/pages/Pricing/Pricing.jsx"));

// 工作区
const Project = lazy(() => import("../views/pages/Project/Project.jsx"));
const Usage = lazy(() => import("../views/pages/Usage/Usage.jsx"));
const APIKeys = lazy(() => import("../views/pages/APIKeys/APIKeys.jsx"));
const UserSettings = lazy(() => import("@/views/pages/UserInfo/UserSettings/UserSettings.jsx"));
const CreateProject = lazy(() => import("../views/pages/CreateProject/CreateProject.jsx"));
const WorkSettings = lazy(() => import("../views/pages/WorkSettings/WorkSettings.jsx"));

// 项目
const Dataset = lazy(() => import("../views/pages/Dataset/Dataset.jsx"));
const UploadData = lazy(() => import("../views/pages/UploadData/UploadData.jsx"));
const Versions = lazy(() => import("../views/pages/Versions/Versions.jsx"));
const APIDocs = lazy(() => import("../views/pages/APIDocs/APIDocs.jsx"));

// 数据中心
const DataCenter = lazy(() => import("../views/pages/DataCenter/DataCenter.jsx"));

function PageRouter() {
  const location = useLocation();
  const balance = useSelector((state) => state.user.userInfo.balance);
  // 如果余额为0且不在pricing页面，重定向到pricing
  if (balance <= 0 && location.pathname !== "/pricing") {
    return (
      <Redirect
        to={{
          pathname: "/pricing",
          state: { from: location },
        }}
      />
    );
  }

  return (
    <Suspense fallback={<PageLoading height="100%" />}>
      <Switch>
        <Route path="/project" component={Project} />
        <Route path="/create-project" component={CreateProject} />
        <Route path="/work-settings" component={WorkSettings} />
        <Route path="/user-info/usage" component={Usage} />
        <Route path="/user-info/api-keys" component={APIKeys} />
        <Route path="/user-info/user-settings" component={UserSettings} />

        <Route path="/pricing" component={Pricing} />

        <Route path="/dataset" component={Dataset} />
        <Route path="/upload-data" component={UploadData} />
        <Route path="/versions" component={Versions} />
        <Route path="/api-docs" component={APIDocs} />

        <Route path="/data-center" component={DataCenter} />
        <Route path="/" exact render={() => <Redirect to="/project" />} />
      </Switch>
    </Suspense>
  );
}

export default PageRouter;
