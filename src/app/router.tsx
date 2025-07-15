import { BrowserRouter, Routes, Route} from "react-router-dom";
import SignInPage from "@/pages/SignIn";
import SignUpPage from "@/pages/SignUp";
import MainPage from "@/pages/Main";
import NoticePage from "@/pages/Notice";
import CallbackPage from "@/pages/Callback";
import Onboarding from "@/pages/Onboarding";
import MyPage from "@/pages/MyPage";

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
        {/* <Route path="/team-building" element={}/> */}
        {/* <Route path="/bmc" element={}/> */}
        <Route path="/my-profile" element={<MyPage/>}/>
        {/* <Route path="/my-business" element={}/> */}
        <Route path="/oauth/callback" element={<CallbackPage/>}/>
      </Routes>
    </BrowserRouter>
  )
};

export default Router;