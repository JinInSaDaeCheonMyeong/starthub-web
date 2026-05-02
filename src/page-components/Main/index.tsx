import MainMenu from "@/features/mainMenu/ui";
import MainContent from "./ui/MainContent";
import * as S from "@/styles/pages/Main-style";
import Banner from "@/shared/ui/Banner";
import AdBanner from "@/shared/ui/AdBanner";

const MainPage = () => {
  return (
    <>
      <Banner/>
      <S.CenteredBox>
        <MainMenu />
      </S.CenteredBox>
      <S.CenteredBox>
        <MainContent />
      </S.CenteredBox>
      <AdBanner/>
    </>
  );
};

export default MainPage;