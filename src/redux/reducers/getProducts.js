import productTypes from "../type/getProducts";

const initialState = []

// eslint-disable-next-line default-param-last
export default function productsReduser(state = initialState, action) {
  switch (action.type) {
    case productTypes.FILL_PRODUCTS:
      return [action.payload];
    default:
      return state;
  }
}
