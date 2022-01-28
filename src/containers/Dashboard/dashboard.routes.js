import React, { lazy, Suspense, useEffect } from 'react';
import { Route, useRouteMatch, Switch } from 'react-router-dom';
import Loader from '@iso/components/shared/template/utility/loader';

const routes = [
	{
		path: 'originacao',
		exact: 'originacao',
		component: lazy(() => import('./Pages/Originacao')),
	},
	{
		path: 'pessoas',
		exact: 'pessoas',
		component: lazy(() => import('./Pages/Pessoa')),
	},
];

export default function AppRouter({operacao}) {
	const { url } = useRouteMatch();


	useEffect(() => {
		console.log('operacao');
		console.log(operacao);
    }, [operacao]);


	return (
		<Suspense fallback={<Loader />}>
			<Switch>
				{routes.map((route, idx) => (
					<Route exact={route.exact} key={idx} path={`${url}/${route.path}`}>
						<route.component uuid={operacao.uuid}/>{console.log(route.exact)}
					</Route>
				))}
			</Switch>
		</Suspense>
	);
}
