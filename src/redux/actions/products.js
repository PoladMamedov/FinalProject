// import {productTypes} from "../type/productTypes";
//
// // eslint-disable-next-line import/prefer-default-export
// export function fillProducts(data) {
//
//   return {
//     type: productTypes.FILL_PRODUCTS,
//     payload: data,
//   };
// }
// export function getProductsAsync() {
//   return async (dispatch) => {
//     try {
//       const response = await fetch("https://final-project-backend-phi.vercel.app/api/products");
//       const data = await response.json();
//       dispatch(fillProducts(data));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// }