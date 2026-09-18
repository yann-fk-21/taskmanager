import { Navigate, useLocation } from 'react-router-dom';
import { isTokenValid } from '../utils/utils';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  if (isTokenValid() === false) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
