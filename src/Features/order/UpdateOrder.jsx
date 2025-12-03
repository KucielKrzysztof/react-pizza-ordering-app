import { useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";
function UpdateOrder({ orderObj }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make this order PRIORITY</Button>
    </fetcher.Form>
  );
}

export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  // thanks to revalidation it will update the page without navigation - react router knows that data changed so it will refetch data and rerender (bcs. thats how fetcher.Form works)
  return null;
}

export default UpdateOrder;
