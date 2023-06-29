import productTypes from "../type/getProducts";


export default function fillProducts(data) {
  return {
    type: productTypes.FILL_PRODUCTS,
    payload: data,
  };
}
