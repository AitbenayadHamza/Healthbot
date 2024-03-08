import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  const location = useLocation();

    return currentUser ? <>{children}</> : <Navigate to="/signin" state={{ path: location.pathname}}/>;
}

export default ProtectedRoute;
