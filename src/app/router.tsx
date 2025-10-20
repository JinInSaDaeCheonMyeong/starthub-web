import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "@/pages/SignIn";
import SignUpPage from "@/pages/SignUp";
import MainPage from "@/pages/Main";
import NoticePage from "@/pages/Notice";
import CallbackPage from "@/pages/Callback";
import Onboarding from "@/pages/Onboarding";
import MyProfile from "@/pages/MyProfile";
import BmcPage from "@/pages/Bmc/BmcPage";
import EarlyOnboarding from "@/pages/Onboarding/early";
import PreOnboarding from "@/pages/Onboarding/pre";
import NoticeListUpPage from "@/pages/NoticeListUp";
import EditMyProfile from "@/pages/EditProfile";
import LikeList from "@/pages/LikeList";
import NoticeDetailPage from "@/pages/NoticeDetail";
import ScrollToTop from "@/shared/utils/ScrollToTop/scrollToTop";
import BmcGeneratePage from "@/pages/Bmc/BmcGeneratePage";
import BmcDetailPage from "@/pages/Bmc/BmcDetailPage";
import CompetitorList from "@/pages/Competitor/List";
import CompetitorCreate from "@/pages/Competitor/Create";
import CompetitorBmcSection from "@/pages/Competitor/BmcSelection";
import CompetitorAnalysis from "@/pages/CompetitorAnalysis";

const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/notices" element={<NoticePage />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/bmc" element={<BmcPage />} />
        <Route path="/bmc/generate" element={<BmcGeneratePage />} />
        <Route path="/bmc/detail/:id" element={<BmcDetailPage />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-profile-edit" element={<EditMyProfile />} />
        <Route path="/oauth/callback" element={<CallbackPage />} />
        <Route path="/onboarding/early-startup" element={<EarlyOnboarding />} />
        <Route path="/onboarding/pre-startup" element={<PreOnboarding />} />
        <Route path="/notices/:type" element={<NoticeListUpPage />} />
        <Route path="/like-list" element={<LikeList />} />
        <Route path="/notice/:id" element={<NoticeDetailPage />} />
        <Route path="/competitor/create" element={<CompetitorCreate />} />
        <Route path="/competitor/analysis" element={<CompetitorAnalysis />} />
        <Route path="/competitor" element={<CompetitorList />} />
        <Route
          path="/competitor/bmc-selection"
          element={<CompetitorBmcSection />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
