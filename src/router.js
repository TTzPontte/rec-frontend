import React, { lazy, Suspense } from "react";
import {
  Route,
  Redirect,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { useSelector } from "react-redux";

import ErrorBoundary from "@iso/components/shared/template/ErrorBoundary";
import { PUBLIC_ROUTE } from "./route.constants";
import { PRIVATE_ROUTE } from "./route.constants";
import Loader from "@iso/components/shared/template/utility/loader";

const Dashboard = lazy(() => import("./containers/Dashboard"));

const publicRoutes = [
  {
    path: PRIVATE_ROUTE.DASHBOARD,
    exact: true,
    component: lazy(() => import("@iso/containers/Login")),
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
    component: lazy(() => import("@iso/containers/Login")),
  },
];
function PrivateRoute({ children, ...rest }) {
  const isAuthenticated = !!useSelector(({ Auth }) => Auth.credentials.tokenId);

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
            <PrivateRoute path="/dashboard">
              <Dashboard />
            </PrivateRoute>
          </Switch>
        </Router>
      </Suspense>
    </ErrorBoundary>
  ) : (
    <Loader />
  );
}
