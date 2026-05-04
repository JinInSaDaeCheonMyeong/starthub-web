import CompetitorTemplateCard from "@/shared/ui/CompetitorTemplateCard";
import NotMyPage from "@/features/profile/users/profileForm/ui/NotMyPage";
import { useAuthStore } from "@/app/model/stores/useAuthStore";

const CompetitorList = () => {
  const { isLoggedIn } = useAuthStore();

  return (
    <>
      {isLoggedIn ? (
        <CompetitorTemplateCard />
      ) : (
        <div className="min-h-[60vh] flex justify-center">
          <NotMyPage />
        </div>
      )}
    </>
  );
};

export default CompetitorList;
