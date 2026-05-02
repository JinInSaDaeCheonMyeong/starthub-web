"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface BlockedRouteProps {
  message?: string;
  redirectTo?: string;
}

const BlockedRoute = ({ message, redirectTo = "/" }: BlockedRouteProps) => {
  const router = useRouter();

  useEffect(() => {
    toast.error(message);
    router.push(redirectTo);
  }, [message, redirectTo, router]);

  return null;
};

export default BlockedRoute;