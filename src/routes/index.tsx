import { RouteObject } from "react-router-dom";
import Home from "../components/home";
import MarketplacePage from "../pages/MarketplacePage";
import AuctionsPage from "../pages/AuctionsPage";
import VideosPage from "../pages/VideosPage";
import GamesPage from "../pages/GamesPage";
import DatingPage from "../pages/DatingPage";
import AdminPage from "../pages/AdminPage";
import AdvancedAdminPage from "../pages/AdvancedAdminPage";
import MembershipPage from "../pages/MembershipPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/marketplace",
    element: <MarketplacePage />,
  },
  {
    path: "/auctions",
    element: <AuctionsPage />,
  },
  {
    path: "/videos",
    element: <VideosPage />,
  },
  {
    path: "/games",
    element: <GamesPage />,
  },
  {
    path: "/dating",
    element: <DatingPage />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/admin/advanced",
    element: <AdvancedAdminPage />,
  },
  {
    path: "/membership",
    element: <MembershipPage />,
  },
];

export default routes;
