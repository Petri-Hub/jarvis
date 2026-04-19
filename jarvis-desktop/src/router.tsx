import { createHashRouter, RouterProvider } from 'react-router-dom';
import { LoginPage, HomePage } from './pages';

const router = createHashRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/home',
    element: <HomePage />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
