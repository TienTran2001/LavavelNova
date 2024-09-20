import { collectionIcon, dashboardIcon } from '@/app/_assets';
import Image from 'next/image';
import { RouteType } from './type';

const appRoutes: RouteType[] = [
  {
    state: 'dashboards',
    sideBarProps: {
      icon: (
        <>
          <Image
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
        path: '/admin/dashboard/main',
        state: 'dashboards.home',
        sideBarProps: {
          displayName: 'Main',
        },
      },
      {
        path: 'admin/dashboard/users',
        state: 'dashboards.users',
        sideBarProps: {
          displayName: 'Users',
        },
      },
    ],
  },

  {
    state: 'materials',
    sideBarProps: {
      icon: (
        <>
          <Image
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
        path: '/admin/materials/main',
        state: 'materials.main',
        sideBarProps: {
          displayName: 'Main',
        },
      },
      {
        path: '/admin/materials/main/create',
        state: 'materials.create',
      },
      {
        path: '/admin/materials/main/update',
        state: 'materials.update',
      },
      {
        path: '/admin/materials/categories',
        state: 'materials.categories',
        sideBarProps: {
          displayName: 'Categories',
        },
      },
    ],
  },
];

export default appRoutes;
