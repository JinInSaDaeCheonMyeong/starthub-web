import CompetitorTemplateCard from "@/shared/ui/CompetitorTemplateCard";
import Layout from "@/shared/ui/Layout";
import NotMyPage from "@/features/profile/users/profileForm/ui/NotMyPage";
import { useAuthStore } from "@/app/model/stores/useAuthStore";


const CompetitorList = () => {
  const {isLoggedIn} = useAuthStore()

  return (
    <Layout>
      {isLoggedIn ? (
        <CompetitorTemplateCard />
      ) : (
        <div style={{minHeight:"60vh", display:"flex", justifyContent:"center"}}>
          <NotMyPage />
        </div>
      )}
    </Layout>
  );
};

export default CompetitorList;
