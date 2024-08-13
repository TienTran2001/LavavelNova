// @react
import { Outlet } from 'react-router-dom';

//  @types
import { RouteType } from './type';

// @page
import {
  CreateMaterialCategory,
  UpdateMaterialCategory,
} from '~/pages/Dashboard/MaterialCategoriesPage/actions';
import UsersPage from '~/pages/Dashboard/UsersPage/UsersPage';
import MaterialCategoriesPage from '../pages/Dashboard/MaterialCategoriesPage/MaterialCategoriesPage';
import {
  CreateMaterial,
  UpdateMaterial,
} from '~/pages/Dashboard/MaterialPage/actions';

// @assets
import { collectionIcon, dashboardIcon } from '~/assets';

// @utils
import currentPath from '~/utils/currentPath';
import MaterialsPage from '~/pages/Dashboard/MaterialPage/MaterialsPage';

const appRoutes: RouteType[] = [
  {
    state: 'dashboards',
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
        path: currentPath.dashboards.home,
        element: <>main</>,
        state: 'dashboards.home',
        sideBarProps: {
          displayName: 'Main',
        },
      },
      {
        path: currentPath.dashboards.user,
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
        path: currentPath.materials.home,
        element: <MaterialsPage />,
        state: 'materials',
        sideBarProps: {
          displayName: 'Main',
        },
      },
      {
        path: currentPath.materials.create,
        element: <CreateMaterial />,
        state: 'materials.create',
      },
      {
        path: currentPath.materials.update,
        element: <UpdateMaterial />,
        state: 'materials.update',
      },
      {
        path: currentPath.materialCategories.home,
        element: <MaterialCategoriesPage />,
        state: 'materials.categories',
        sideBarProps: {
          displayName: 'Categories',
        },
      },
      {
        path: currentPath.materialCategories.update,
        element: <UpdateMaterialCategory />,
        state: 'materials.categories-detail',
      },
      {
        path: currentPath.materialCategories.create,
        element: <CreateMaterialCategory />,
        state: 'materials.categories.create',
      },
    ],
  },
];

export default appRoutes;
