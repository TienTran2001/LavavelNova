import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout';
import { routes } from './routers';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route
              path="/"
              element={<Navigate to="/resources/users" replace />}
            />
            {routes}
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <DashboardLayout>
        <div className="w-[200px] h-[200px] bg-red-600">fd</div>
      </DashboardLayout> */}
    </>
  );
}

export default App;
