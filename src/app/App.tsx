import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from "@/app/router";
import { GlobalStyle } from "@/shared/style/webfont.style";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Router />
    </QueryClientProvider>
    
  );
}

export default App;
