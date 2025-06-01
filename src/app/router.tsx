import { BrowserRouter, Routes, Route} from "react-router-dom";
import SignInPage from "@/pages/SignIn";
import SignUpPage from "@/pages/SignUp";

const Router = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<SignUpPage/>}/>
        <Route path="/sign-in" element={<SignInPage/>}/>
      </Routes>
    </BrowserRouter>
  )
};

export default Router;