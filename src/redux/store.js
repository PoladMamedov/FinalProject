import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";// defaults to localStorage for web
// import { burgerMenuReducer as burgerMenu } from "./reducers/burgerMenu";
import burgerMenuReducer from "./reducers/burgerMenu";

const rootReducer = combineReducers({
  // products: productsReducer,
  isMenuOpen: burgerMenuReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
export const persistor = persistStore(store);