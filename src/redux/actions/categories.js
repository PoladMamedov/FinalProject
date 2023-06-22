import { categoriesTypes } from "../type/categories";

export function showCategories(data) {
  return {
    type: categoriesTypes.CATEGORIES,
    payload: data,
  };
}

export const fetchCategories = () => {
  return async (dispatch) => {
    try {
      const response = await fetch("/data/catalog.json");
      const data = await response.json();
      const categories = data;
      console.log(categories);
      dispatch(showCategories(categories));
    } catch (error) {
      dispatch("Error fetching categories:", error);
    }
  };
};
