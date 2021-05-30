import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { routerReducer, routerMiddleware } from "react-router-redux";

import * as authentificateReducer from '../Login/reducers';
import * as userReducer from '../MyPage/reducers';
import * as adminUsersReducer from '../Users/reducers';
import * as categoriesReducer from '../EditProducts/reducers';
import * as productsReducer from '../Products/reducers';
import * as ordersReducer from '../Orders/reducers';

export default function configureStore(history, initialState) {
  const reducers = {
    authentificateUser: authentificateReducer.reducer,
    currentUser: userReducer.reducer,
    adminUsers: adminUsersReducer.reducer,
    categories: categoriesReducer.reducer,
    products: productsReducer.reducer,
    orders: ordersReducer.reducer
  };

  const middleware = [thunk, routerMiddleware(history)];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === "development";
  if (isDevelopment && typeof window !== "undefined" && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  }

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );

  return store;
}
