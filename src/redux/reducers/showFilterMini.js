import showFilterTypes from "../type/isShowFilterMini";

const initialState = false;

// eslint-disable-next-line default-param-last
export default function showMiniFilterReduser(state = initialState, action) {
  switch (action.type) {
    case showFilterTypes.SHOW_MINI_FILTER:
      return action.payload;
    default:
      return state;
  }
}