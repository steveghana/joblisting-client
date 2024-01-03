// import { useRouter } from "next/navigation";
import React from 'react';
// import { Session } from 'next-auth';
import { IProfession, UserRoleSelection } from '../../types/roles';
import { useNavigate } from 'react-router';
import { useTypedDispatch } from '../../store';
import { userApi } from '../../store/services/userAuth.service';
import { toast } from 'react-toastify';
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRoleSelection;
}
// type SessionWithRole = Session & {
//   user: {
//     role: string; // Add the role property
//   };
// };
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles = [] }) => {
  //TODO: change to cookie
  // Check if the user is not authenticated
  const session = sessionStorage.getItem('auth_token');
  const role = sessionStorage.getItem('role');
  const currentPageName = window.location.pathname.split('/').pop() || '';
  const router = useNavigate();
  //  const dispatch = useTypedDispatch();
  //  const accessTokenQueryResult = userApi.endpoints.getAccessToken.useQuery(
  //    code!,
  //    {
  //      skip: !code,
  //    }
  //  );
  //  const { data } = accessTokenQueryResult;
  //  const accessToken = data?.access_token;
  React.useEffect(() => {
    const userRole = role as IProfession;
    if (!session) {
      // Redirect to the login page or handle authentication as needed
      router('/auth/login');
      toast.warn('No session was found, try loggin in', { position: 'bottom-center' });
    }
    // dispatch(authSlice.actions.updateAccessToken(accessToken));

    if (
      userRole &&
      !allowedRoles.includes(userRole)
      // !rolesToPages[userRole]?.includes(currentPageName)
    ) {
      // Redirect to an access denied page or handle unauthorized access
      router('/access-denied');
    }
  }, [session]);

  // If authenticated and has the correct role, render the children
  return <>{children}</>;
};
export const Protect =
  <P extends {}>(Component: React.ComponentType<P>, allowedRoles: UserRoleSelection) =>
  (props: P) =>
    (
      <ProtectedRoute allowedRoles={allowedRoles}>
        <Component {...props} />
      </ProtectedRoute>
    );
