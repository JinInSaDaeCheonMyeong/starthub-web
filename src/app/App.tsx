import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from "@/app/router";
import { GlobalStyle } from "@/shared/style/webfont.style";
import GlobalToastContainer from "@/shared/ui/Toast";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Router />
      <GlobalToastContainer />
    </QueryClientProvider>
  );
}

export default App;
