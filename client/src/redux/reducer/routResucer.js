import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { authReducer } from "./authReducer";
import { productReducer } from "./productReducer";
import { cartReducer } from "./cartReducer";
import { addressReducer } from "./adressReducer";

export const routResucer = combineReducers({
  user: userReducer,
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
  address: addressReducer,
});
