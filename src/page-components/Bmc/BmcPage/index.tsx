import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import BmcList from "@/shared/ui/BmcList";
import BmcTemplateCard from "@/entities/bmc/ui/BmcTemplateCard";
import { useAuthStore } from "@/app/model/stores/useAuthStore";

const BmcPage = () => {
  const { isLoggedIn } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.info("로그인 후 이용하실 수 있습니다.", { toastId: "login-required-bmc" });
      router.push("/sign-in");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return (
      <div className="w-full mt-[120px] sm:mt-[130px] md:mt-[140px] lg:mt-[150px] mb-[50px]">
        <div className="w-full px-4 md:px-8 lg:w-[1040px] lg:mx-auto lg:px-0">
          <div className="min-h-[60vh] flex justify-center items-center">
            <div className="text-center">
              <p className="font-pt-body2-medium text-hub-gray-2">로그인 페이지로 이동 중...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-[120px] sm:mt-[130px] md:mt-[140px] lg:mt-[150px] mb-[50px]">
      <div className="w-full px-4 md:px-8 lg:w-[1040px] lg:mx-auto lg:px-0">
        <BmcTemplateCard />
        <BmcList />
      </div>
    </div>
  );
};

export default BmcPage;
