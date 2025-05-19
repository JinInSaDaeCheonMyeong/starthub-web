import { BrowserRouter, Routes, Route} from "react-router-dom";
import SignUpPage from "../pages/SignUp";


const Router = () => {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<SignUpPage/>}></Route>
      </Routes>
    </BrowserRouter>
  )
};

export default Router;