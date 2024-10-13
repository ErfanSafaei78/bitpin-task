import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Markets } from "./pages/Markets";
import { MarketDetails } from "./pages/MarketDetails";

import { ThemeProvider } from "./contexts/ThemeContext";
import { Header } from "./components/Header";

import "./App.scss";

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
      <div className="w-100 p-4">
        <RouterProvider router={routes} />
      </div>
    </ThemeProvider>
  );
}

export default App;
