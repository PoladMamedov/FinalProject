import showFilterTypes from "../type/isShowFilterMini";


export default function isShowFilterMini(data) {
  return {
    type: showFilterTypes.SHOW_MINI_FILTER,
    payload: data,
  };
}