// Core
import { combineReducers } from "redux";

// Reducers
import {productsReduser as product} from "./reducers/products";
import {pagePathReducer as currentPath} from "./reducers/setPagePath";

// eslint-disable-next-line import/prefer-default-export
export const rootReducer = combineReducers({ product, currentPath});
