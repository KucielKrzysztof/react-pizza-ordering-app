import { Link } from "react-router-dom";
import SearchOrder from "../Features/order/SearchOrder";
import Username from "../Features/user/Username";

function Header() {
  return (
    <header className="font-pizza relative flex items-center justify-between border-b-3 border-sky-600 bg-sky-400 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="font-extrabold tracking-[.1rem]">
        🍕 React Pizza
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
