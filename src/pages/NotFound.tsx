import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const NotFound = () => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Determine where to redirect based on authentication status
  const redirectPath = isAuthenticated 
    ? (user?.role === 'admin' ? '/admin/dashboard' : '/student/dashboard')
    : '/login';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page non trouvée</p>
        <Link to={redirectPath} className="text-library-primary hover:text-library-secondary underline">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
