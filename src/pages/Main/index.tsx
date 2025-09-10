import Layout from "@/shared/ui/Layout";
import MainMenu from "@/features/mainMenu/ui";
import MainContent from "./ui/MainContent";
import * as S from "./style"; 
import Banner from "@/shared/ui/Banner";
import AdBanner from "@/shared/ui/AdBanner";

const MainPage = () => {
  return (
    <Layout>
      <Banner/>
      <S.CenteredBox>
        <MainMenu />
      </S.CenteredBox>
      <S.CenteredBox>
        <MainContent />
      </S.CenteredBox>
      <AdBanner/>
    </Layout>
  );
};

export default MainPage;