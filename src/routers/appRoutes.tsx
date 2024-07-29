// import UserPage from '../pages/Dashboard/UserPage';
import { Outlet } from 'react-router-dom';
import { collectionIcon, dashboardIcon } from '../assets';
import { RouteType } from './type';
import UsersPage from '../pages/Dashboard/UsersPage/UsersPage';
import MaterialCategoriesPage from '../pages/Dashboard/MaterialCategoriesPage/MaterialCategoriesPage';
import CreateMaterialCategory from '../pages/Dashboard/MaterialCategoriesPage/CreateMaterialCategory';
import UpdateMaterialCategory from '../pages/Dashboard/MaterialCategoriesPage/UpdateMaterialCategory';

const appRoutes: RouteType[] = [
  {
    state: 'dashboards',
    path: '/dashboards',
    element: <>{<Outlet />}</>,
    sideBarProps: {
      icon: (
        <>
          <img
            src={dashboardIcon}
            alt="dashboard icon"
            className="object-cover w-full h-full"
          />
        </>
      ),
      displayName: 'Dashboards',
    },
    child: [
      {
        path: '/dashboards/main',
        element: <>This is main page</>,
        state: 'dashboards.home',
        sideBarProps: {
          displayName: 'Main',
        },
      },
      {
        path: '/dashboards/users',
        element: <UsersPage />,
        state: 'dashboards.users',
        sideBarProps: {
          displayName: 'Users',
        },
      },
    ],
  },

  {
    state: 'materials',
    path: '/materials',
    element: <>{<Outlet />}</>,
    sideBarProps: {
      icon: (
        <>
          <img
            src={collectionIcon}
            alt="collection icon"
            className="object-cover w-full h-full"
          />
        </>
      ),
      displayName: 'Materials',
    },
    child: [
      {
        path: '/materials/categories',
        element: <MaterialCategoriesPage />,
        state: 'materials.categories',
        sideBarProps: {
          displayName: 'Categories',
        },
      },
      {
        path: '/materials/categories/:id',
        element: <UpdateMaterialCategory />,
        state: 'materials.categories-detail',
      },
      {
        path: '/materials/categories/create',
        element: <CreateMaterialCategory />,
        state: 'materials.categories.create',
      },
    ],
  },
];

export default appRoutes;
