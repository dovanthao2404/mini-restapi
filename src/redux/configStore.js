import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import { combineReducers } from "redux";
import { userManagementReducer } from "./reducers/UserManagementReducer";

const rootReducer = combineReducers({ userManagementReducer });

export const store = createStore(rootReducer, applyMiddleware(thunk));