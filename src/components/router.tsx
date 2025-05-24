import { BrowserRouter, Routes, Route} from "react-router-dom";
import SignUpPage from "../pages/SignUp";
import SignInPage from "../pages/SignIn";


const Router = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<SignUpPage/>}></Route>
        <Route path="/sign-in" element={<SignInPage/>}/>
      </Routes>
    </BrowserRouter>
  )
};

export default Router;