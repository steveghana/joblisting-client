import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes, { homeRoutes } from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([
    homeRoutes,
    // ExternalRoutes,
    MainRoutes,
    AuthenticationRoutes,
  ]);
}
