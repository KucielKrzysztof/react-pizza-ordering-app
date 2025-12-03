import Button from "../../ui/Button.jsx";
import DeleteCartItem from "../cart/DeleteCartItem.jsx";
import UpdateCartItemQuantity from "../cart/UpdateCartItemQuantity.jsx";
import { formatCurrency } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../cart/cartSlice.js";
import { getCurrentQuantityById } from "../cart/cartSlice.js";

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newPizza = {
      pizzaId: id,
      name: name,
      quantity: 1,
      unitPrice: unitPrice,
      totalPrice: unitPrice * 1,
    };
    console.log(newPizza);
    dispatch(addItem(newPizza));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 sm:h-30 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium text-sky-500">{name}</p>
        <p className="text-sm text-sky-50 capitalize italic">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between text-sm">
          {!soldOut ? (
            <>
              <p className="text-sky-50">{formatCurrency(unitPrice)}</p>
            </>
          ) : (
            <p className="font-semibold text-red-800 uppercase">Sold out</p>
          )}
          {!soldOut && (
            <div>
              {!isInCart && (
                <Button type="small" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              )}
              {isInCart && (
                <div className="flex items-center gap-2 text-sky-50">
                  <UpdateCartItemQuantity id={id} quantity={currentQuantity} />
                  <DeleteCartItem id={id} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
