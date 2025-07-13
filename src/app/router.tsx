import { BrowserRouter, Routes, Route} from "react-router-dom";
import { lazy, Suspense } from "react";

// 동적 import를 사용한 코드 분할
const SignInPage = lazy(() => import("@/pages/SignIn"));
const SignUpPage = lazy(() => import("@/pages/SignUp"));
const MainPage = lazy(() => import("@/pages/Main"));
const NoticePage = lazy(() => import("@/pages/Notice"));
const CallbackPage = lazy(() => import("@/pages/Callback"));
const Onboarding = lazy(() => import("@/pages/Onboarding"));
const MyProfile = lazy(() => import("@/pages/MyProfile"));

// 로딩 컴포넌트
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    fontSize: '18px' 
  }}>
    로딩 중...
  </div>
);

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/sign-up" element={<SignUpPage/>}/>
          <Route path="/sign-in" element={<SignInPage/>}/>
          <Route path="/notices" element={<NoticePage/>}/>
          <Route path="/onboarding" element={<Onboarding/>}/>
          {/* <Route path="/competitor" element={}/> */}
          {/* <Route path="/team-building" element={}/> */}
          {/* <Route path="/bmc" element={}/> */}
          <Route path="/my-profile" element={<MyProfile/>}/>
          {/* <Route path="/my-business" element={}/> */}
          <Route path="/oauth/callback" element={<CallbackPage/>}/>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
