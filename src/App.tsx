import { QueryClient, QueryClientProvider } from "react-query";
import { Application } from "react-rainbow-components";
import { AuthProvider } from "./contexts/auth";
import { ShoppingCartProvider } from "./contexts/shop/shop.context";
import Router from "./router";

const queryClient = new QueryClient({});

const theme = {
  rainbow: {
    palette: {
      brand: "#00CDA5",
      mainBackground: "#222930",
    },
  },
};

function App() {
  return (
    <AuthProvider>
      <ShoppingCartProvider>
        <QueryClientProvider client={queryClient}>
          <Application theme={theme}>
            <Router />
          </Application>
        </QueryClientProvider>
      </ShoppingCartProvider>
    </AuthProvider>
  );
}

export default App;
