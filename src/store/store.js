import {combineReducers, createStore} from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import clientReducer from "./reducers/clientReducer";

// Объявление reducer'ов
const rootReducer = combineReducers({
  client: clientReducer
})

export const store = createStore(rootReducer, composeWithDevTools());
