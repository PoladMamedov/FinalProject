import cartTypes from "../type/cart";
import useServer from "../../hooks/useServer";

export function fillCart(products) {
  return {
    type: cartTypes.FILL_CART,
    payload: { products },
  };
}

export function addToCart(products) {
  return {
    type: cartTypes.ADD_TO_CART,
    payload: { products },
  };
}

export const fetchCart = (token) => {
  return async (dispatch) => {
    const { getCart } = useServer();
    try {
      const cart = await getCart(token);
      dispatch(fillCart(cart.products));
    } catch (error) {
    }
  };
};

export const setCart = (products, token) => {
  return async (dispatch) => {
    const { updateCart } = useServer();
    try {
      const updatedCart = await updateCart(products, token);
      dispatch(fillCart(updatedCart.products));
    } catch (error) {
    }
  };
};


export function clearCart() {
  return {
    type: cartTypes.CLEAR_CART,
    payload: true,
  };
}

export function clearCheckout() {
  return function (dispatch) {
    console.log(localStorage.getItem("cart"));
    dispatch(clearCart());
  };
}