import BmcList from "@/shared/ui/BmcList";
import BmcTemplateCard from "@/entities/bmc/ui/BmcTemplateCard";
import Layout from "@/shared/ui/Layout";
import { useAuthStore } from "@/app/model/stores/useAuthStore";
import NotMyPage from "@/features/profile/users/profileForm/ui/NotMyPage";
const BmcPage = () => {
  const { isLoggedIn } = useAuthStore();
  return (
    <Layout>
      {isLoggedIn ? (
        <>
          <BmcTemplateCard />
          <BmcList />
        </>
      ) : (
        <div
          style={{
            minHeight: "60vh",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <NotMyPage />
        </div>
      )}
    </Layout>
  );
};

export default BmcPage;
