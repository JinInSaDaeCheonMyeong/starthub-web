type SocialProvider = "google" | "naver" | "apple";

export const useSocialSignIn = (provider: SocialProvider) => {
  const handleSocialSignIn = () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    window.location.href = `${baseUrl}/oauth2/authorization/${provider}`;
  };

  return { handleSocialSignIn };
};
