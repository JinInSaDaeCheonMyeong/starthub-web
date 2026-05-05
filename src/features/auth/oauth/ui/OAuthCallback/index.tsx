import { useOAuthCallback } from "../../model/useOAuthCallback";

const OAuthCallback = () => {
  const { error } = useOAuthCallback();

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-5">
      {!error && (
        <div
          className="
          w-[50px] h-[50px]
          border-4 border-hub-gray-4
          border-t-hub-primary
          rounded-full
          animate-spin
        "
        />
      )}

      <p className="text-pt-body2 text-hub-gray-2 text-center">
        {error ? "로그인 실패" : "로그인 중입니다..."}
      </p>
    </div>
  );
};

export default OAuthCallback;
