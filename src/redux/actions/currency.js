import currencyTypes from "../type/currency";

export default function setCurrency(value) {
   return {
      type: currencyTypes.SET_CURRENCY,
      payload: value,
   };
}