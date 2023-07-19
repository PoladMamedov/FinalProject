export const addToFavorites = (product) => {
  return {
    type: "ADD_TO_FAVORITES",
    payload: product,
  };
};

export const removeFromFavorites = (itemId) => {
  return {
    type: "REMOVE_FROM_FAVORITES",
    payload: itemId,
  };
};

export const incrementFavoritesCount = () => {
  return {
    type: "INCREMENT_FAVORITES_COUNT",
  };
};

export const decrementFavoritesCount = () => {
  return {
    type: "DECREMENT_FAVORITES_COUNT",
  };
};