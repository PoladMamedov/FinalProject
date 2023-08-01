import ordersTypes from "../type/orders";

const initialState = {
  orderNumber: null,
};

// eslint-disable-next-line default-param-last
const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case ordersTypes.SET_ORDER_NUMBER:
      return {
        ...state,
        orderNumber: action.payload,
      };
    default:
      return state;
  }
};

export default ordersReducer;
