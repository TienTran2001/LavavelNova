import { ReactNode } from 'react';
export type RouteType = {
  state: string;
  index?: boolean;
  path?: string;
  child?: RouteType[];
  sideBarProps?: {
    displayName: string;
    icon?: ReactNode;
  };
};
