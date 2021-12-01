import React, { lazy, Suspense } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import Loader from '@iso/components/utility/loader';

const routes = [
	{
		path: 'originacao',
		component: lazy(() => import('../Originacao')),
	},
];

export default function AppRouter({operacao}) {
	const { url } = useRouteMatch();
	return (
		<Suspense fallback={<Loader />}>
			<Switch>
				{routes.map((route, idx) => (
					<Route exact={route.exact} key={idx} path={`${url}/${route.path}`}>
						<route.component operacao={operacao}/>
					</Route>
				))}
			</Switch>
		</Suspense>
	);
}
