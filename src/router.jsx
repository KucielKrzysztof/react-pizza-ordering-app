import { createBrowserRouter } from "react-router-dom";

import Home from "./ui/Home.jsx";
import Menu, { loader as menuLoader } from "./Features/menu/Menu.jsx"; //get the loader as menuLoader
import Cart from "./Features/cart/Cart.jsx";
import CreateOrder, {
  action as createOrderAction,
} from "./Features/order/CreateOrder.jsx";
import { action as updateOrderAction } from "./Features/order/UpdateOrder.jsx";
import Order, { loader as orderLoader } from "./Features/order/Order.jsx";
import AppLayout from "./ui/AppLayout.jsx";
import Error from "./ui/Error.jsx";

const router = createBrowserRouter([
  {
    element: <AppLayout />, // We dont have path here, this makes it a layout route(a route with only purpose to provide layout to application)
    errorElement: <Error />,
    children: [
      //nested routs should be placed into children option of the route - parent child structure, they can be displayed with <Outlet />
      { path: "/", element: <Home /> },
      {
        path: "/menu",
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: "/cart", element: <Cart /> },
      {
        path: "/order/new",
        element: <CreateOrder />,
        action: createOrderAction,
      },
      {
        path: "/order/:orderId",
        element: <Order />,
        loader: orderLoader,
        action: updateOrderAction,
        errorElement: <Error />,
      },
    ],
  },
]);

export default router;
