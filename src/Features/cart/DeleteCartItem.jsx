import Button from "../../ui/Button";
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";

function DeleteCartItem({ id }) {
  const dispatch = useDispatch();

  function handleDeleteItem() {
    dispatch(deleteItem(id));
  }
  return (
    <Button type="smallSecondary" onClick={handleDeleteItem}>
      Remove
    </Button>
  );
}

export default DeleteCartItem;
