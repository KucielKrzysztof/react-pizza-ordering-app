// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";

import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { getOrder } from "../../services/apiRestaurant.js";

import OrderItem from "./OrderItem.jsx";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder.jsx";

function Order() {
  const order = useLoaderData();

  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") fetcher.load("/menu");
  }, [fetcher]);

  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="flex flex-col space-y-8 px-4 py-6 text-sky-100">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">
          Order: <span className="font-normal">{id} </span>Status:{" "}
          <span
            className={`${status === "delivered" ? "text-emerald-400" : ""}`}
          >
            {status}
          </span>
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {priority && (
            <span className="rounded-full bg-red-700 px-3 py-1 text-red-100 uppercase">
              Priority
            </span>
          )}
          <span className="rounded-full bg-sky-700 px-3 py-1 text-center wrap-break-word text-sky-50 uppercase">
            {status} order
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 bg-sky-900 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-sm text-stone-200">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="divide-y-2 border-t-2 border-b-2">
        {cart.map((i, index) => (
          <OrderItem
            item={i}
            key={index}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              fetcher?.data?.find((el) => el.id === i.pizzaId).ingredients
            }
          />
        ))}
      </ul>
      <div className="space-y-2 bg-sky-900 px-6 py-5">
        <p className="text-sm font-medium">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="text-sm font-bold text-sky-400">
          Pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && (
        <div>
          <UpdateOrder orderObj={order} />
        </div>
      )}
    </div>
  );
}

export async function loader({ params }) {
  // cant use useParams here - hooks can be only used inside components, but react router buy itself passes some data lo loader functions as it loades it, so we just catch that
  const orderId = params.orderId;
  const order = getOrder(orderId);
  return order;
}

export default Order;
