import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { burgerMenuReducer as burgerMenu } from "./reducers/burgerMenu";
import { categoriesReducer as categories } from "./reducers/categories";

const rootReducer = combineReducers({
  // products: productsReducer,
  isMenuOpen: burgerMenu,
  categories: categories,
});

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
export const persistor = persistStore(store);