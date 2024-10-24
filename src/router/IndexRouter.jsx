import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { isLogin } from "../utils/handleToken";
import PageLoading from "@/components/PageLoading/PageLoading";

const Login = React.lazy(() => import("../views/Login/Login.jsx"));
const Registered = React.lazy(() => import("../views/Registered/Registered.jsx"));
const Layouts = React.lazy(() => import("../layouts/Layouts.jsx"));

function IndexRouter() {
  return (
    <Router>
      <Suspense fallback={<PageLoading height="100vh" />}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/registered" component={Registered} />
          <Route path="/" render={() => (isLogin() ? <Layouts /> : <Redirect to="/login" />)} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default IndexRouter;
