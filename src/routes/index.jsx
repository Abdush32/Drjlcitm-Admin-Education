import { lazy } from 'react';
const University = lazy(() => import('../Admin/Universities'));
const Banners = lazy(() => import('../Admin/Banners'));
const Courses = lazy(() => import('../Admin/Courses'));
const Dashboard = lazy(()=> import('../Admin/Dashboard/ECommerce'))


const index = [
  {
    path: 'dashboard',
    name: 'Dashboard',
    element: Dashboard,
    authentication: true,
  },

  {
    path: 'courses',
    name: 'Courses',
    element: Courses,
    authentication: true,
  },
  {
    path: 'university',
    name: 'University',
    element: University,
    authentication: true,
  },
  {
    path: 'banners',
    name: 'Banners',
    element: Banners,
    authentication: true,
  },


];

export default index;
