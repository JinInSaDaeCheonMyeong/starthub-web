import Header from "@/widgets/Header";
import Banner from "@/shared/ui/Banner";
import Footer from "@/shared/ui/Footer";
import MainMenu from "@/features/mainMenu/ui";
import MainContent from "./ui/MainContent";
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
      <Footer />
    </S.PageLayout>
  );
};

export default MainPage;

