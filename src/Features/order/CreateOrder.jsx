import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  const user = useSelector((state) => state.user);
  const {
    username,
    status: addressStatus,
    position,
    address: location,
    error: addressError,
  } = user;
  const isLoadingLocation = addressStatus === "loading";

  const [withPriority, setWithPriority] = useState(false);

  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const formErrors = useActionData();

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-6 text-sky-50">
      <h2 className="mb-8 text-xl font-bold">Ready to order? Let's go!</h2>

      <Form method="POST" action="/order/new">
        <div className="orderInputContainer">
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              className="input"
              type="text"
              name="customer"
              required
              defaultValue={username}
            />
          </div>
        </div>

        <div className="orderInputContainer">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-full bg-red-200 p-2 text-center text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="orderInputContainer relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input"
              type="text"
              name="address"
              required
              disabled={isLoadingLocation}
              defaultValue={location}
            />
            {addressStatus === "error" && (
              <p className="mt-2 rounded-full bg-red-200 p-2 text-center text-xs text-red-700">
                {addressError}
              </p>
            )}
          </div>
          {!position.latitude && (
            <span className="absolute top-[32.9px] right-0 z-100 sm:top-[1px]">
              <Button
                disabled={isLoadingLocation}
                type="goelocation"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                GET LOCATION
              </Button>
            </span>
          )}
        </div>

        <div className="mt-2 mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-sky-400 focus:ring focus:ring-sky-400 focus:ring-offset-1 focus:outline-none"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => {
              setWithPriority(e.target.checked);
            }}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          {/* another hidden input for position */}
          <input
            type="hidden"
            name="position"
            value={
              position.latitude
                ? `${position.latitude} ${position.longitude}`
                : ""
            }
          />

          <Button disabled={isSubmitting || isLoadingLocation}>
            {isSubmitting
              ? "Submitting..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority,
  };
  console.log(order);
  // musimy spowrotem zmienić string cart na obiekt json, tak samo priority daje on/off a chcemy true/false
  //(bo w HTML checkbox działa jako on/off).

  //handling errors:
  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = "Please give us correct phone number.";
    //dodajemy do errors wartość phone, tak można dodawać jak jest const
    //tak nie można (nadpisywać):
    // errors = {phone: 123}
  }

  // jeżeli ilośc kluczy w obiekcie jest większa niż 0 (są błędy), zwraca je i potem łapiemy to w useActionData jako formErrors
  if (Object.keys(errors).length > 0) return errors;

  // if everything is correct, create new order and redirect

  const newOrder = await createOrder(order);
  // używamy funkcji createOrder aby wysłać order na poprawny endpoint i dodać nowe zamówienie
  // dodatkowo ta funkcja od serwera w response dostaje dane nowego zamówienia (res.json) i zwraca je dla nas w postaci json (return data)
  // następnie my tą odpowiedź bierzemy i przechowywujemy w zmiennej newOrder

  // czyścimy koszyk, NIE WOLNO NADUŻYWAĆ IMPORTU store w Funkcjach! - ale czasem trzeba
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
  //Po złożeniu zamówienia użytkownik jest automatycznie przenoszony na stronę np.: /order/123
}
export default CreateOrder;
