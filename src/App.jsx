import React, { Suspense, lazy, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import routes from './routes';
import Login from './Auth';
import { useSelector } from 'react-redux';
const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));
const App = () => {
  const [color, setColor] = useState('red');
  // const [loading, setLoading] = useState(true);

  const token = useSelector((state) => state?.Auth[0]?.token);
  const checkAuth = (route) => {
    if (route.authentication) {
      if (token === undefined) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };


  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Suspense fallback={ <div className="vh-100 d-flex align-items-center justify-content-center">
              Loading...
            </div>
}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<DefaultLayout />}>
            {routes.map((route, index) => (
              <Route
              key={`admin-key-${index}`}
                path={route.path}
                element={
                  checkAuth(route) ? <route.element /> : <Navigate to="/" />
                }
                // element={<route.element />}
              />
            ))}
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
