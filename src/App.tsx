import { QueryClient, QueryClientProvider } from "react-query";
import { Application } from "react-rainbow-components";
import { AuthProvider } from "./contexts/auth";
import Router from "./router";

const queryClient = new QueryClient({});

const theme = {
  rainbow: {
    palette: {
      brand: "#80deea",
      mainBackground: "#303030",
    },
  },
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Application theme={theme}>
          <Router />
        </Application>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
