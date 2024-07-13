import { ReactNode } from 'react';
import { RouteType } from './type';
import { Route } from 'react-router-dom';
import appRoutes from './appRoutes';

const generateRoute = (routes: RouteType[]): ReactNode => {
  return routes.map((route, index) =>
    route.index ? (
      <Route
        index
        key={index}
        path={route.path}
        element={<>{route.element}</>}
      />
    ) : (
      <Route key={index} path={route.path} element={<>{route.element}</>}>
        {route.child && generateRoute(route.child)}
      </Route>
    )
  );
};

export const routes: ReactNode = generateRoute(appRoutes);
