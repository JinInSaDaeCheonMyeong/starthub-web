import CompetitorTemplateCard from "@/shared/ui/CompetitorTemplateCard";
import Layout from "@/shared/ui/Layout";
import NotMyPage from "@/features/profile/users/profileForm/ui/NotMyPage";
import { useAuthStore } from "@/app/model/stores/useAuthStore";
import styled from "styled-components";


const CompetitorList = () => {
  const {isLoggedIn} = useAuthStore()

  return (
    <Layout>
      {isLoggedIn ? (
        <CompetitorTemplateCard />
      ) : (
        <NotMyPageWrap>
          <NotMyPage />
        </NotMyPageWrap>
      )}
    </Layout>
  );
};

export default CompetitorList;


const NotMyPageWrap = styled.div`
  min-height: 60vh;
  display: flex;
  justify-content: center;
`