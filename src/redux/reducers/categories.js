import { categoriesTypes } from "../type/categories";


const initialState = {
  categories: [],
  error: null,
};

export function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case categoriesTypes.CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        error: null,
      }
    default:
      return state;
  }
};
