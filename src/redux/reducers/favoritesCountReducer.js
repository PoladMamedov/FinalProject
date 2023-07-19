const initialState = {
  favoritesCount: 0,
};

const favoritesCountReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case "INCREMENT_FAVORITES_COUNT":
      return {
        ...state,
        favoritesCount: state.favoritesCount + 1,
      };
    case "DECREMENT_FAVORITES_COUNT":
      return {
        ...state,
        favoritesCount: state.favoritesCount - 1,
      };
    default:
      return state;
  }
};

export default favoritesCountReducer;
