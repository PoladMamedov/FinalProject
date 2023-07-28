import ordersTypes from "../type/orders";


export default function setOrderNumber(orderNumber) {
  return {
    type: ordersTypes.SET_ORDER_NUMBER,
    payload: orderNumber,
  };
}