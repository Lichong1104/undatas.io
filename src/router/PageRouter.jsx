import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PageLoading from "@/components/PageLoading/PageLoading";

// 工作区
const Project = lazy(() => import("../views/pages/Project/Project"));
const Usage = lazy(() => import("../views/pages/Usage/Usage"));
const APIKeys = lazy(() => import("../views/pages/APIKeys/APIKeys"));
const UserSettings = lazy(() => import("@/views/pages/UserInfo/UserSettings/UserSettings"));
const CreateProject = lazy(() => import("../views/pages/CreateProject/CreateProject"));
const WorkSettings = lazy(() => import("../views/pages/WorkSettings/WorkSettings"));

// 项目
const Dataset = lazy(() => import("../views/pages/Dataset/Dataset"));
const UploadData = lazy(() => import("../views/pages/UploadData/UploadData"));
const Versions = lazy(() => import("../views/pages/Versions/Versions"));

function PageRouter() {
  return (
    <Suspense fallback={<PageLoading height="100%" />}>
      <Switch>
        <Route path="/project" component={Project} />
        <Route path="/user-info/usage" component={Usage} />
        <Route path="/user/api-keys" component={APIKeys} />
        <Route path="/user-info/user-settings" component={UserSettings} />
        <Route path="/create-project" component={CreateProject} />
        <Route path="/work-settings" component={WorkSettings} />
        <Route path="/dataset" component={Dataset} />
        <Route path="/upload-data" component={UploadData} />
        <Route path="/versions" component={Versions} />
        <Route path="/" exact render={() => <Redirect to="/project" />} />
      </Switch>
    </Suspense>
  );
}

export default PageRouter;
