type SocialProvider = "google" | "naver" | "apple";

export const useSocialSignIn = (provider: SocialProvider) => {
  const handleSocialSignIn = () => {
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    window.location.href = `${baseUrl}/oauth2/authorization/${provider}`;
  };

  return { handleSocialSignIn };
};
