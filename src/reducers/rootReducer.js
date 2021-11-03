import { combineReducers } from "redux";
import user from "./user";
import data from "./data";

const appReducer = combineReducers({ user, data });

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
