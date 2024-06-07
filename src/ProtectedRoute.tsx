import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { supabase } from "./lib/supabase";

interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setIsAuthenticated(!!user);
    };

    checkUser();
  }, []);

  if (isAuthenticated === null) {
    // Render a loading indicator or null while checking authentication state
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
