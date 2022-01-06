import { QueryClient, QueryClientProvider } from "react-query";
import { Application } from "react-rainbow-components";
import { AuthProvider } from "./contexts/auth";
import Router from "./router";

const queryClient = new QueryClient({})

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Application>
          <Router />
        </Application>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
