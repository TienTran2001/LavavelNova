import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout/DashboardLayout';
import { routes } from './routers';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
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
