import Button from "../../ui/Button";
import LinkButton from "../../ui/LinkButton";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart } from "./cartSlice";

function Cart() {
  const username = useSelector((store) => store.user.username);
  const cart = useSelector(getCart);

  const dispatch = useDispatch();

  function handleClearCart() {
    dispatch(clearCart());
  }

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-3 text-sky-50">
      <LinkButton to="/menu">&larr; Back to menu </LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      <ul className="mt-3 divide-y divide-sky-50 border-b border-sky-50">
        {cart.map((i) => (
          <CartItem item={i} key={i.pizzaId} />
        ))}
      </ul>
      <div className="mt-6 space-x-2">
        <Button to="/order/new">Order pizzas</Button>

        <Button type="secondary" onClick={handleClearCart}>
          Clear Cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
