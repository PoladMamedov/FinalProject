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
    default:
      return state;
  }
}

export default cartReducer;
