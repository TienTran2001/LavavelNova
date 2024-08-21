import { Navigate, Outlet, useLocation } from 'react-router-dom';
import currentPath from '~/utils/currentPath';
const ProtectedRoutes = ({ auth }: { auth: boolean }) => {
  const location = useLocation();

  if (!auth) {
    return (
      <Navigate
        to={currentPath.login}
        replace
        state={{ redirectTo: location }}
      />
    );
  }
  return <Outlet />;
};
export default ProtectedRoutes;
