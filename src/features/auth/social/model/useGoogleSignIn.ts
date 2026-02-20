export const useGoogleSignIn = () => {
  const handleGoogleSignIn = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    window.location.href = `${baseUrl}/oauth2/authorization/google`;
  };

  return { handleGoogleSignIn };
};
