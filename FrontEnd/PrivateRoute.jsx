import { Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

    return currentUser ? <>{children}</> : <Navigate to="/signin" />;
}

export default ProtectedRoute;
