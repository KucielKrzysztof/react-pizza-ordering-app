import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  //cart: [],
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      //payload = new Pizza Object
      state.cart.push(action.payload);
    },
    deleteItem: (state, action) => {
      //payload = pizza item id
      state.cart = state.cart.filter((i) => i.pizzaId !== action.payload);
    },
    increaseItemQuantity: (state, action) => {
      //payload = id
      const item = state.cart.find((i) => i.pizzaId === action.payload);
      item.quantity += 1;
      item.totalPrice = item.unitPrice * item.quantity;
    },
    decreaseItemQuantity: (state, action) => {
      const item = state.cart.find((i) => i.pizzaId === action.payload);
      item.quantity -= 1;
      item.totalPrice = item.unitPrice * item.quantity;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
      //
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

// Redux suggests to calculate it inside selectorFunction, not in the component - redux best practice
export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, curr) => sum + curr.quantity, 0);
// Redux Selector Functions should be named starting with getSmth...

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, curr) => sum + curr.totalPrice, 0);

export const getCart = (state) => state.cart.cart;

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((i) => i.pizzaId === id)?.quantity ?? 0;
