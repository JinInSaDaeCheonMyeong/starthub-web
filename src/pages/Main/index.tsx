import Header from "@/widgets/Header";
import Banner from "@/shared/ui/Banner";
import AdBanner from "@/shared/ui/AdBanner";
import MainMenu from "@/features/mainMenu/ui";
import MainContent from "./ui/MainContent";
import Footer from "@/widgets/Footer";
import * as S from "./style"

const MainPage = () => {
  return (
    <S.PageLayout>
      <Header />
      <Banner />
      <S.CenteredBox>
        <MainMenu />
      </S.CenteredBox>
      <S.CenteredBox>
        <MainContent />
      </S.CenteredBox>
      <AdBanner />
      <Footer/>
    </S.PageLayout>
  );
};

export default MainPage;

