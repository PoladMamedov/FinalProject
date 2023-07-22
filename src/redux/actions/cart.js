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
    payload: products,
  };
}
export const removeCart = (itemId) => {
  return {
    type: cartTypes.REMOVE_CART,
    payload: {
      id: itemId
    }
  };
};
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
export const removeCartAsync = (itemId, token) => {
  return async (dispatch) => {
    const {removeItemFromCart} = useServer();
    try {
      // eslint-disable-next-line no-unused-vars
      const deletedCart = await removeItemFromCart(itemId, token);
      dispatch(removeCart(itemId));
    } catch (error) {
      console.error("Failed to remove item:", error);
  }
};
};

export const increaseCart = (itemId, productInfo) => {
  return {
    type: cartTypes.INCREASE_CART,
    payload: {
      id: itemId,
      product: productInfo
    }
  };
};

export const increaseCartAsync = (itemId, token, productInfo) => {
  return async (dispatch) => {
    const {addItemCart} = useServer();
    try {
      // eslint-disable-next-line no-unused-vars
      const addedCart = await addItemCart(itemId, token);
      dispatch(increaseCart(itemId, productInfo));
    } catch (error) {
      console.error("Failed to increase item:", error);
    }
  };
};

export const decreaseCart = (itemId) => {
  return {
    type: cartTypes.DECREASE_CART,
    payload: {
      id: itemId
    }
  };
};

export const decreaseCartAsync = (itemId, token) => {
  return async (dispatch) => {
    const {decreaseProductQuantity} = useServer();
    try {
      // eslint-disable-next-line no-unused-vars
      const decreasedCart = await decreaseProductQuantity(itemId, token);
      dispatch(decreaseCart(itemId));
    } catch (error) {
      console.error("Failed to decrease item:", error);
    }
  };
};

export const removeEntireCart = () => {
  return {
    type: cartTypes.REMOVE_ENTIRE_CART
  };
};
