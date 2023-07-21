import useServer from "../../hooks/useServer";
import orderNumberTypes from "../type/orderNumber";

// eslint-disable-next-line import/prefer-default-export
// export function setOrderNumber(orderNumber) {
//     return {
//       type: orderNumberTypes.SET_ORDER_NUMBER,
      
//       payload: orderNumber,
//     };
// }


export function createOrder(data) {
  return {
    type: orderNumberTypes.PLACE_ORDER,
    payload: data,
  };
}


export function setOrder(orderData) {
  return async (dispatch) => {
    const { placeOrder } = useServer();
    try {
      const addedOrder = await placeOrder(orderData);
        dispatch(createOrder(addedOrder));
        // localStorage.clear("cartitems");
        // dispatch() //clearcart() action
    } catch (error) {
      console.log("Error fetching items:", error);
    }
  };
}