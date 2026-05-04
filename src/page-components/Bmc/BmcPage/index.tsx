import BmcList from "@/shared/ui/BmcList";
import BmcTemplateCard from "@/entities/bmc/ui/BmcTemplateCard";
import { useAuthStore } from "@/app/model/stores/useAuthStore";
import NotMyPage from "@/features/profile/users/profileForm/ui/NotMyPage";

const BmcPage = () => {
  const { isLoggedIn } = useAuthStore();
  return (
    <>
      {isLoggedIn ? (
        <>
          <BmcTemplateCard />
          <BmcList />
        </>
      ) : (
        <div className="min-h-[60vh] flex justify-center">
          <NotMyPage />
        </div>
      )}
    </>
  );
};

export default BmcPage;
