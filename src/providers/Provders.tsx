import { ReactNode } from 'react';
import AuthContext from './AuthContext';
type ProviderPropType = {
  children: ReactNode;
};
const AuthProviders = ({ children }: ProviderPropType) => {
  return <AuthContext>{children}</AuthContext>;
};

export default AuthProviders;
