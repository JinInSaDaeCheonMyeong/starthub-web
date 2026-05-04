import MainMenu from "@/features/mainMenu/ui";
import MainContent from "./ui/MainContent";
import Banner from "@/shared/ui/Banner";
import AdBanner from "@/shared/ui/AdBanner";

const MainPage = () => {
  return (
    <>
      <Banner />
      <div className="flex justify-center w-full">
        <MainMenu />
      </div>
      <div className="flex justify-center w-full">
        <MainContent />
      </div>
      <AdBanner />
    </>
  );
};

export default MainPage;
