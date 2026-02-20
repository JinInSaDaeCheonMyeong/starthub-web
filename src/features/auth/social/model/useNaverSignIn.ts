export const useNaverSignIn = () => {
  const handleNaverSignIn = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    window.location.href = `${baseUrl}/oauth2/authorization/naver`;
  };

  return { handleNaverSignIn };
};
