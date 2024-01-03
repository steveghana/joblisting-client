import { lazy } from 'react';
import MainLayout from '../layout/MainLayout';
// project imports
// import MainLayout from 'layout/MainLayout';
import Loadable from '../components/Loadable';
import BaseLayout from '../components/layouts/BaseLayout';
import { Navigate } from 'react-router';
import { FormDataProvider } from '../contexts/clientFormContext';
// dashboard routing
const InterviewEdit = Loadable(lazy(() => import('../views/Devs/Interview/interviewEdit')));
const ShortUrlPage = Loadable(lazy(() => import('../views/dashboard/Roles/ExternalRoleUrlResolver')));
const ExternalRoles = Loadable(lazy(() => import('../views/dashboard/Roles/ExternalRoleUrlResolver/externalRoles')));
const JobInfo = Loadable(lazy(() => import('@/views/dashboard/Roles/RoleTabs')));
const InterviewScheduler = Loadable(lazy(() => import('../views/HR/interviewSteps/InterviewScheduler')));
const JobSubmissionContainer = Loadable(lazy(() => import('../views/dashboard/Applicants/ApplicationForm/JobSubmission')));
const Developers = Loadable(lazy(() => import('../views/Devs')));
const AddClient = Loadable(lazy(() => import('../views/dashboard/clients/Forms/clientForm')));
const ClientDetails = Loadable(lazy(() => import('../views/dashboard/clients/Details')));
const StatusComingSoon = Loadable(lazy(() => import('../views/status/ComingSoon')));
const Status404 = Loadable(lazy(() => import('../views/status/Status404')));
const DashboardDefault = Loadable(lazy(() => import('../views/dashboard/Default')));
const UserProfile = Loadable(lazy(() => import('../views/users/profile')));
const UserSettings = Loadable(lazy(() => import('../views/users/settings')));
// utilities routing
const Clients = Loadable(lazy(() => import('../views/dashboard/clients')));
const Roles = Loadable(lazy(() => import('../views/dashboard/Roles')));
const Interviews = Loadable(lazy(() => import('../views/Devs/Interview/Interviews')));
const Hub = Loadable(lazy(() => import('../views/Devs/Hub/devHub')));
const AuthLogin3 = Loadable(lazy(() => import('../views/authentication/loginContainer')));

// sample page routing
const ShortListedDevs = Loadable(lazy(() => import('../views/HR')));

// ==============================|| MAIN ROUTING ||============================== //
// export const ExternalRoutes = {
//   path: '/',
//   element: <BaseLayout />,
//   children: [
//     {
//       path: '/',
//       element: <Home />,
//     },
//   ],
// };
export const homeRoutes = {
  path: '/',
  element: <BaseLayout />,
  children: [
    {
      path: '/',
      element: <Navigate to="/auth/login" replace />,
    },
    {
      path: '/access-denied',
      element: <Status404 />,
    },
    {
      path: '*',
      element: <Status404 />,
    },
  ],
};
const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/s/:shortComponent',
      element: <ShortUrlPage />,
    },
    {
      path: '/c/:clientId',
      element: <ExternalRoles />,
    },
    {
      path: '/dashboard',
      element: <DashboardDefault />,
    },

    {
      path: 'dashboard',
      children: [
        {
          path: '',
          element: <Navigate to="default" replace />,
        },
        {
          path: 'default',
          element: <DashboardDefault />,
        },
        {
          path: 'customers/clients',
          element: <Clients />,
        },
        {
          path: 'customers/clients/:id',
          element: <ClientDetails />,
        },
        {
          path: 'customers/clients/add',
          element: (
            <FormDataProvider>
              <AddClient />,
            </FormDataProvider>
          ),
        },
        {
          path: 'roles/jobs',
          element: <Roles />,
        },
        {
          path: 'roles/:roleid/job/:jobid',
          element: <JobInfo />,
        },
      ],
    },

    {
      path: 'management',
      // element: <SidebarLayout />,
      children: [
        {
          path: '',
          element: <Navigate to="transactions" replace />,
        },

        {
          path: 'profile',
          children: [
            {
              path: '',
              element: <Navigate to="details/:id" replace />,
            },
            {
              path: 'details/:id',
              element: <UserProfile />,
            },
            {
              path: 'settings/:id',
              element: <UserSettings />,
            },
          ],
        },
      ],
    },
    {
      path: 'devs',
      children: [
        {
          path: 'all',
          element: <Developers />,
        },

        {
          path: 'interviews',
          element: <Interviews />,
        },
        {
          path: 'interviews/Edit/:id',
          element: <InterviewEdit />,
        },
        {
          path: 'hub',
          // element: <Hub />,
          element: <StatusComingSoon />,
        },
      ],
    },
    {
      path: 'devs/shortlisted',
      element: <ShortListedDevs />,
    },
    {
      path: 'devs/clockify',
      element: <StatusComingSoon />,
    },
    {
      path: '/hr/interviews/:id',
      element: <InterviewScheduler />,
      // element: <Scheduler />,
    },
    {
      path: '/hr/interviews/create',
      element: <InterviewScheduler />,
      // element: <Scheduler />,
    },
    {
      path: 'job-submttion/:roleid/job/:jobid',
      element: <JobSubmissionContainer />,
    },
  ],
};

export default MainRoutes;
