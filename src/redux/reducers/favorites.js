const initialState = {
  favorites: [],
};

const favoritesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "ADD_TO_FAVORITES":
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    case "REMOVE_FROM_FAVORITES":
      return {
        ...state,
        favorites: state.favorites.filter(
          (product) => product.itemNo !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default favoritesReducer;