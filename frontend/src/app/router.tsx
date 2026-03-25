import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { HomePage } from "@/pages/HomePage";
import { ListingDetailPage } from "@/pages/ListingDetailPage";
import { LoginPage } from "@/pages/LoginPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
  {
    path: ROUTES.LOGIN,
    element: <LoginPage />,
  },
  {
    path: "/listings/:id",
    element: <ListingDetailPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);