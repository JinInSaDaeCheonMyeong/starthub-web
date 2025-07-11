import { BrowserRouter, Routes, Route} from "react-router-dom";
import SignInPage from "@/pages/SignIn";
import SignUpPage from "@/pages/SignUp";
import MainPage from "@/pages/Main";

const Router = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/sign-up" element={<SignUpPage/>}/>
        <Route path="/sign-in" element={<SignInPage/>}/>
        {/* <Route path="/notices" element={}/> */}
        {/* <Route path="/competitor" element={}/> */}
        {/* <Route path="/team-building" element={}/> */}
        {/* <Route path="/bmc" element={}/> */}
        {/* <Route path="/my-profile" element={}/> */}
        {/* <Route path="/my-business" element={}/> */}
      </Routes>
    </BrowserRouter>
  )
};

export default Router;