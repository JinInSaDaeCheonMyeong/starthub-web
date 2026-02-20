export const useAppleSignIn = () => {
  const handleAppleSignIn = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    window.location.href = `${baseUrl}/oauth2/authorization/apple`;
  };

  return { handleAppleSignIn };
};
