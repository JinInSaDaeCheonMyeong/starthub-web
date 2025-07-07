import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from "@/app/router";
import { GlobalStyle } from "@/shared/style/webfont.style";
import GlobalToastContainer from "@/shared/ui/Toast";

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
      <GlobalToastContainer />
    </>
  );
}

export default App;
