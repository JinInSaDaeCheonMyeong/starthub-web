import { BrowserRouter, Routes, Route} from "react-router-dom";
import SignInPage from "@/pages/SignIn";
import SignUpPage from "@/pages/SignUp";
import MainPage from "@/pages/Main";
import NoticePage from "@/pages/Notice";
import CallbackPage from "@/pages/Callback";
import Onboarding from "@/pages/Onboarding";
import MyProfile from "@/pages/MyProfile";
import BmcPage from "@/pages/Bmc/Create";
import TeamBuilding from "@/pages/TeamBuilding";

const Router = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/sign-up" element={<SignUpPage/>}/>
        <Route path="/sign-in" element={<SignInPage/>}/>
        <Route path="/notices" element={<NoticePage/>}/>
        <Route path="/onboarding" element={<Onboarding/>}/>
        {/* <Route path="/notices" element={}/> */}
        {/* <Route path="/competitor" element={}/> */}
        <Route path="/team-building" element={<TeamBuilding/>}/>
        <Route path="/bmc" element={<BmcPage/>}/>
        <Route path="/my-profile" element={<MyProfile/>}/>
        {/* <Route path="/my-business" element={}/> */}
        <Route path="/oauth/callback" element={<CallbackPage />} />
      </Routes>
    </BrowserRouter>
  )
};

export default Router;