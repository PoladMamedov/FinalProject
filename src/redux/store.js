import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { pagePathReducer } from "./reducers/setPagePath";
import categories from "./reducers/categories";
import userReducer from "./reducers/user";
import counterFilterReducer from "./reducers/counterFilter";

const rootReducer = combineReducers({
  // products: productsReducer,
  currentPath: pagePathReducer,
  categories,
  user: userReducer,
  countFilter: counterFilterReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
export const persistor = persistStore(store);
