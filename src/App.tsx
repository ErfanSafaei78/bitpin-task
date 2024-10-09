import "./App.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Markets } from "./pages/markets";
import { MarketDetails } from "./pages/marketDetails";
import { Header } from "./components/Header";
import { ThemeProvider } from "./contexts/ThemeContext";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Markets />,
  },
  {
    path: "market/:marketId",
    element: <MarketDetails />,
  },
]);

function App() {
  return (
    <ThemeProvider>
      <Header />
      <div className="w-full">
        <RouterProvider router={routes} />
      </div>
    </ThemeProvider>
  );
}

export default App;
