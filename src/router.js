import React, { lazy, Suspense, useEffect } from "react";
import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { useSelector } from "react-redux";

import ErrorBoundary from "./ErrorBoundary";
import { PUBLIC_ROUTE } from "./route.constants";
import { PRIVATE_ROUTE } from "./route.constants";
import Loader from "@iso/components/utility/loader";
import { store } from "./redux/store";

const Dashboard = lazy(() => import("./containers/Dashboard/Dashboard"));

const publicRoutes = [
  {
    path: PRIVATE_ROUTE.DASHBOARD,
    exact: true,
    component: lazy(() => import("@iso/containers/Pages/SignIn/SignIn")),
  },
  {
    path: PUBLIC_ROUTE.PAGE_404,
    component: lazy(() => import("@iso/containers/Pages/404/404")),
  },
  {
    path: PUBLIC_ROUTE.PAGE_500,
    component: lazy(() => import("@iso/containers/Pages/500/500")),
  },
  {
    path: PUBLIC_ROUTE.SIGN_IN,
    component: lazy(() => import("@iso/containers/Pages/SignIn/SignIn")),
  },
  {
    path: PUBLIC_ROUTE.FORGET_PASSWORD,
    component: lazy(() =>
      import("@iso/containers/Pages/ForgotPassword/ForgotPassword")
    ),
  },
  {
    path: PUBLIC_ROUTE.RESET_PASSWORD,
    component: lazy(() =>
      import("@iso/containers/Pages/ResetPassword/ResetPassword")
    ),
  },
];
function PrivateRoute({ children, ...rest }) {
  const isAuthenticated = !!useSelector(
    (state) => state.Auth.credentials.userToken
  );

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default function Routes() {
  const { Auth } = useSelector((state) => state);

  console.log("route", Auth.isLoading);

  return !Auth.isLoading ? (
    <ErrorBoundary>
      <Suspense fallback={<Loader />}>
        <Router>
          <Switch>
            {publicRoutes.map((route, index) => (
              <Route key={index} path={route.path} exact={route.exact}>
                <route.component />
              </Route>
            ))}
            <PrivateRoute path="/">
              <Dashboard path="/dashboard" />
            </PrivateRoute>
          </Switch>
        </Router>
      </Suspense>
    </ErrorBoundary>
  ) : null;
}
