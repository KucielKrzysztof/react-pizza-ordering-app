import { formatCurrency } from "../../utils/helpers";

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-2">
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="font-bold">{quantity}&times;</span> {name}
          <div>
            {!isLoadingIngredients ? (
              <small className="text-stone-300 capitalize italic">
                {ingredients?.join(", ")}
              </small>
            ) : (
              <small> loading...</small>
            )}
          </div>
        </div>
        <p>{formatCurrency(totalPrice)}</p>
      </div>
    </li>
  );
}

export default OrderItem;
