import orderNumberTypes from "../type/orderNumber";

// const initialState = {
//   orderNumber: "",
// };

// // eslint-disable-next-line default-param-last
// const orderNumberReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case orderNumberTypes.SET_ORDER_NUMBER:
//       return {
//         ...state,
//         orderNumber: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export default orderNumberReducer;

const initialState = {
  orderData: {},
};

// eslint-disable-next-line default-param-last
const orderNumberReducer = (state = initialState, action) => {
  switch (action.type) {
    case orderNumberTypes.PLACE_ORDER:
      return { ...state, orderData: action.payload };

    default:
      return state;
  }
};

export default orderNumberReducer;