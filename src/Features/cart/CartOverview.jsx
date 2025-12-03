import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartQuantity, getTotalCartPrice } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity);
  // Now we import the selector function and use it

  const totalCartPrice = useSelector(getTotalCartPrice);

  if (totalCartPrice <= 0) return null;

  return (
    <div className="flex items-center justify-between bg-sky-800 px-4 py-4 text-sm text-sky-200 uppercase sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-sky-100">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
