import cartTypes from "../type/cart";

const initialState = {
  cart: [],
};

// eslint-disable-next-line default-param-last
function cartReducer(state = initialState, action) {
  switch (action.type) {
    case cartTypes.FILL_CART:
      return {
        ...state,
        cart: [...action.payload.products],
      };
    case cartTypes.ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.payload.products],
      };
    case cartTypes.CLEAR_CART:
      return {
        ...state,
        cart: action.payload ? [] : state.cart
      };
    case cartTypes.REMOVE_CART: {
      // eslint-disable-next-line no-underscore-dangle
      const updatedItems = state.cart.filter((item) => item.product._id !== action.payload.id);
      return {
        ...state,
        cart: updatedItems
      };
    }
    case cartTypes.INCREASE_CART: {
      // eslint-disable-next-line no-underscore-dangle
      const findItem = state.cart.find((item) => item.product._id === action.payload.id);
      if (findItem) {
        const updatedItem = {
          ...findItem,
          cartQuantity: findItem.cartQuantity + 1
        };
        // eslint-disable-next-line no-underscore-dangle
        const updatedItems = state.cart.map((item) => (item.product._id === action.payload.id ? updatedItem : item));
        return {
          ...state,
          cart: updatedItems
        };
      }
        const newItem = {
          ...action.payload,
          cartQuantity: 1
        };
        return {
          ...state,
          cart: [...state.cart, newItem]
        };
    }
    case cartTypes.DECREASE_CART: {
      // eslint-disable-next-line no-underscore-dangle
      const findItem = state.cart.find((item) => item.product._id === action.payload.id);
        const updatedItem = {
          ...findItem,
          cartQuantity: findItem.cartQuantity - 1
        };
        // eslint-disable-next-line no-underscore-dangle
        const updatedItems = state.cart.map((item) => (item.product._id === action.payload.id ? updatedItem : item));
        return {
          ...state,
          cart: updatedItems
        };
    }
    case cartTypes.REMOVE_ENTIRE_CART: {
      return {
        ...state,
        cart: []
      };
    }
    case cartTypes.UPDATE_CART_QUANTITY: {
      // eslint-disable-next-line no-underscore-dangle
      const findItem = state.cart.find((item) => item.product._id === action.payload.id);
      const updatedItem = {
        ...findItem,
        cartQuantity: action.payload.cartQuantity
      };
      // eslint-disable-next-line no-underscore-dangle
      const updatedItems = state.cart.map((item) => (item.product._id === action.payload.id ? updatedItem : item));
      return {
        ...state,
        cart: updatedItems
      };
    }
    default:
      return state;
  }
}

export default cartReducer;
