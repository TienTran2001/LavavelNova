// @react
import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// @components
import Loading from '~/components/Loading/Loading';
import DashboardLayout from '~/layouts/DashboardLayout/DashboardLayout';
import Login from '~/pages/public/Login';

// @routers
import { routes } from '~/routers';
import ProtectedRoutes from '~/routers/ProtectedRoutes';
import { useUserStore } from '~/store/useUserStore';

// @utils
import currentPath from '~/utils/currentPath';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const location = useLocation();

  const { user } = useUserStore();
  const isAuth = user ? true : false;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  return (
    <>
      {loading && <Loading />}

      <Routes>
        <Route
          path={currentPath.login}
          element={
            isAuth ? (
              <Navigate
                to={
                  location.state?.redirectTo ||
                  currentPath.materialCategories.home
                }
                state={{ from: location }}
              />
            ) : (
              <Login />
            )
          }
        />

        {/* private routes */}
        <Route element={<ProtectedRoutes auth={isAuth} />}>
          <Route path="/" element={<DashboardLayout />}>
            <Route
              path="/"
              element={
                <Navigate to={currentPath.materialCategories.home} replace />
              }
            />
            {routes}
          </Route>
        </Route>
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
