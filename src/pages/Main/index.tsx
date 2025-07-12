import Header from "@/shared/ui/Header";
import Banner from "@/shared/ui/Banner";
import Footer from "@/shared/ui/Footer";
import MainMenu from "@/features/mainMenu/ui";
import MainContent from "./ui/MainContent";
import styled from "styled-components";

const MainPage = () => {
  return (
    <PageLayout>
      <Header />
      <Banner />
      <CenteredBox>
        <MainMenu />
      </CenteredBox>
      <CenteredBox>
        <MainContent />
      </CenteredBox>
      <Footer />
    </PageLayout>
  );
};

export default MainPage;


const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CenteredBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;