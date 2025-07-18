import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface BlockedRouteProps {
  message: string;
  redirectTo?: string;
}

const BlockedRoute = ({ message, redirectTo = "/" }: BlockedRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    toast.error(message);
    navigate(redirectTo);
  }, [message, redirectTo, navigate]);

  return null;
};

export default BlockedRoute;