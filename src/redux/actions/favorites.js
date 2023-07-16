import favoritesTypes from "../type/favorites";

export const addToFavorites = (productId) => {
  return {
    type: favoritesTypes.ADD_TO_FAVORITES,
    payload: productId,
  };
};

export const removeFromFavorites = (productId) => {
  return {
    type: favoritesTypes.REMOVE_FROM_FAVORITES,
    payload: productId,
  };
};

export const incrementFavoritesCount = () => {
  return {
    type: favoritesTypes.INCREMENT_FAVORITES_COUNT,
  };
};

export const decrementFavoritesCount = () => {
  return {
    type: favoritesTypes.DECREMENT_FAVORITES_COUNT,
  };
};


// import favoritesTypes from "../type/favorites";

// export const addToFavorites = (productId) => {
//   return async (dispatch) => {
//     // Выполнение асинхронных операций
//     // Например, получение данных из сервера

//     // Диспетчеризация действия после выполнения асинхронных операций
//     dispatch({
//       type: favoritesTypes.ADD_TO_FAVORITES,
//       payload: productId,
//     });
//   };
// };

// export const removeFromFavorites = (productId) => {
//   return async (dispatch) => {
//     // Выполнение асинхронных операций
//     // Например, отправка запроса на удаление данных

//     // Диспетчеризация действия после выполнения асинхронных операций
//     dispatch({
//       type: favoritesTypes.REMOVE_FROM_FAVORITES,
//       payload: productId,
//     });
//   };
// };

// // Ваш действие (action) с использованием Redux Thunk
// export const fetchData = () => {
//   return (dispatch, getState) => {
//     dispatch({ type: 'FETCH_DATA_REQUEST' });

//     // Выполнение асинхронной операции (например, вызов API)
//     fetch('https://api.example.com/data')
//       .then(response => response.json())
//       .then(data => {
//         // Отправка успешного действия (action)
//         dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data });
//       })
//       .catch(error => {
//         // Отправка действия (action) при ошибке
//         dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.message });
//       });
//   };
// };