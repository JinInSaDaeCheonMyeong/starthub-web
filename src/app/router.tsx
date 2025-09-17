import { BrowserRouter, Routes, Route} from "react-router-dom";
import SignInPage from "@/pages/SignIn";
import SignUpPage from "@/pages/SignUp";
import MainPage from "@/pages/Main";
import NoticePage from "@/pages/Notice";
import CallbackPage from "@/pages/Callback";
import Onboarding from "@/pages/Onboarding";
import MyProfile from "@/pages/MyProfile";
import BmcPage from "@/pages/Bmc/Create";
import BlockedRoute from "@/shared/ui/BlockedRoute";
import EarlyOnboarding from "@/pages/Onboarding/early"
import PreOnboarding from "@/pages/Onboarding/pre"
import NoticeListUpPage from "@/pages/NoticeListUp";
import EditMyProfile from "@/pages/EditProfile"
import LikeList from "@/pages/LikeList";
import NoticeDetailPage from "@/pages/NoticeDetail";

const Router = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/sign-up" element={<SignUpPage/>}/>
        <Route path="/sign-in" element={<SignInPage/>}/>
        <Route path="/notices" element={<NoticePage/>}/>
        <Route path="/onboarding" element={<Onboarding/>}/>
        {/* 차단된 경로들 */}
        <Route 
          path="/competitor" 
          element={
            <BlockedRoute 
              message="경쟁사 분석 기능은 현재 준비 중입니다. 곧 만나보실 수 있어요!" 
              redirectTo="/"
            />
          }
        />
        <Route path="/bmc" element={<BmcPage/>}/>
        <Route path="/my-profile" element={<MyProfile/>}/>
        <Route path="/my-profile-edit" element={<EditMyProfile/>}/>
        <Route path="/oauth/callback" element={<CallbackPage />} />
        <Route path="/onboarding/early-startup" element={<EarlyOnboarding/>}/>
        <Route path="/onboarding/pre-startup" element={<PreOnboarding/>}/>
        <Route path="/notices/:type" element={<NoticeListUpPage/>}/>
        <Route path="/notice/:id" element={<NoticeDetailPage/>}/>
        <Route path="/like-list" element={<LikeList/>}/>
        <Route path="/notice/:id" element={<NoticeDetailPage/>}/>
        <Route path="/like-list" element={<LikeList/>}/>
        <Route path="/notice/:id" element={<NoticeDetailPage/>}/>
        <Route path="/like-list" element={<LikeList/>}/>
      </Routes>
    </BrowserRouter>
  )
};

export default Router;