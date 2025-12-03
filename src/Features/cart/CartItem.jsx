import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";
import DeleteCartItem from "./DeleteCartItem";
import UpdateCartItemQuantity from "./UpdateCartItemQuantity";
import { getCurrentQuantityById } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="py-3 text-sky-50 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        <span className="text-orange-500">{quantity} </span>&times; {name}
      </p>
      <div className="flex items-center justify-between gap-4">
        <UpdateCartItemQuantity id={pizzaId} quantity={currentQuantity} />
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <DeleteCartItem id={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
