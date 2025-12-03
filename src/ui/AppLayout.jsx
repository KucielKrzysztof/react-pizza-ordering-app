import Header from "./Header";
import CartOverview from "../Features/cart/CartOverview";
import { Outlet, useNavigation } from "react-router-dom";
import Spinner from "./Spinner.jsx";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading"; //jeśli jest loading to true, jeśli nie false - wiadomo ocb..

  return (
    <div className="grid h-dvh grid-rows-[auto_1fr_auto]">
      {isLoading && <Spinner />}

      <Header />
      <div className="overflow-scroll sm:overflow-auto">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
