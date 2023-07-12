import toggleCard from "../type/toggleCard";

const initialState = { cardView: true };

// eslint-disable-next-line default-param-last
export default function toggleCardReduser(state = initialState, action) {
  switch (action.type) {
    case toggleCard.TOGGLE_CARD:
      return {
        ...state,
        cardView: action.payload
      };
    default:
      return state;
  }
}
// const initialState = true;
//
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "SET_FILTER":
//       return {
//         ...state,
//         filter: action.payload
//       };
//     default:
//       return state;
//   }
// };