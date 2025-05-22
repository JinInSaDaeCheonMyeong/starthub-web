import { BrowserRouter, Routes, Route} from "react-router-dom";
import SignInPage from "../pages/SignIn";


const Router = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignInPage/>}/>
      </Routes>
    </BrowserRouter>
  )
};

export default Router;