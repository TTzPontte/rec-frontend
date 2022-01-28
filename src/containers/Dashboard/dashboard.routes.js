import React, { lazy, Suspense } from "react";
import { Route, useRouteMatch, Switch } from "react-router-dom";
import Loader from "@iso/components/shared/template/utility/loader";

const routes = [
  {
    path: "originacao",
    component: lazy(() => import("./Pages/Originacao")),
  },
  {
    path: "pessoas",
    component: lazy(() => import("./Pages/Pessoa")),
  },
];

export const DashboardRoutes = ({ operacao }) => {
  const { url } = useRouteMatch();
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {routes.map((route, idx) => (
          <Route exact={true} key={idx} path={`${url}/${route.path}`}>
            <route.component uuid={operacao.uuid} />
          </Route>
        ))}
      </Switch>
    </Suspense>
  );
};
