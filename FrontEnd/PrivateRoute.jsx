import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useEffect } from 'react';

function ProtectedRoute({ children }) {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  

  useEffect(() => {
    const sessionTimeout = setTimeout(() => {
      logout(); 
    }, 60 * 60 * 1000); 
    return () => {
      clearTimeout(sessionTimeout);
    };
  }, [logout]);

    return currentUser ? <>{children}</> : <Navigate to="/signin" state={{ path: location.pathname}}/>;
}

export default ProtectedRoute;
