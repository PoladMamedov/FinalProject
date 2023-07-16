import favoritesTypes from "../type/favorites";

const initialState = {
  favorites: [],
};

const favoritesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case favoritesTypes.ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case favoritesTypes.REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter((item) => item.itemNo !== action.payload),
      };
    default:
      return state;
  }
};

export default favoritesReducer;