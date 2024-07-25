import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout';
import { routes } from './routers';
import Login from './pages/public/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserStore } from './store/useUserStore';

import AuthChecker from './components/AuthChecker/AuthChecker';

function App() {
  const { user } = useUserStore();

  return (
    <>
      <BrowserRouter>
        <AuthChecker>
          <Routes>
            {user && (
              <Route path="/" element={<DashboardLayout />}>
                <Route
                  path="/"
                  element={<Navigate to="/resources/users" replace />}
                />
                {routes}
              </Route>
            )}
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </AuthChecker>
      </BrowserRouter>
      {/* <DashboardLayout>
        <div className="w-[200px] h-[200px] bg-red-600">fd</div>
      </DashboardLayout> */}
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
