import BmcList from "@/shared/ui/BmcList";
import BmcTemplateCard from "@/entities/bmc/ui/BmcTemplateCard";
import Layout from "@/shared/ui/Layout";
import { useAuthStore } from "@/app/model/stores/useAuthStore";
import NotMyPage from "@/features/profile/users/profileForm/ui/NotMyPage";
import styled from "styled-components";
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
        <NotMyPageWrap>
          <NotMyPage />
        </NotMyPageWrap>
      )}
    </Layout>
  );
};

export default BmcPage;

const NotMyPageWrap = styled.div`
  min-height: 60vh;
  display: flex;
  justify-content: center;
`;
