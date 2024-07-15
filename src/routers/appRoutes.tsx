// import UserPage from '../pages/Dashboard/UserPage';
import { Outlet } from 'react-router-dom';
import { collectionIcon, dashboardIcon } from '../assets';
import { RouteType } from './type';
import UsersPage from '../pages/Dashboard/UsersPage/UsersPage';

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
        path: '/dashboards/user-insights',
        element: <>This is user insights page</>,
        state: 'dashboards.user-insights',
        sideBarProps: {
          displayName: 'User Insights',
        },
      },
    ],
  },
  {
    state: 'resources',
    path: '/resources',
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
      displayName: 'Resources',
    },
    child: [
      {
        path: '/resources/addresses',
        element: <>This is addresses page</>,
        state: 'resources.addresses',
        sideBarProps: {
          displayName: 'Addresses',
        },
      },
      {
        path: '/resources/comments',
        element: <>This is user comments page</>,
        state: 'resources.comments',
        sideBarProps: {
          displayName: 'Comments',
        },
      },
      {
        path: '/resources/posts',
        element: <>This is posts page</>,
        state: 'resources.posts',
        sideBarProps: {
          displayName: 'Posts',
        },
      },
      {
        path: '/resources/purchases',
        element: <>This is purchases page</>,
        state: 'resources.purchases',
        sideBarProps: {
          displayName: 'Purchases',
        },
      },
      {
        path: '/resources/roles',
        element: <>This is roles page</>,
        state: 'resources.roles',
        sideBarProps: {
          displayName: 'Roles',
        },
      },
      {
        path: '/resources/tags',
        element: <>This is Tags page</>,
        state: 'resources.tags',
        sideBarProps: {
          displayName: 'Tags',
        },
      },
      {
        path: '/resources/users',
        element: <UsersPage />,
        state: 'resources.users',
        sideBarProps: {
          displayName: 'Users',
        },
      },
    ],
  },
];

export default appRoutes;
