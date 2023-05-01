import { combineReducers } from "redux";
import AdminReducer from "./AdminReducer";
import UtilsReducer from "./UtilsReducer";

const RootReducer = combineReducers({
    Admin:AdminReducer,
    Utils:UtilsReducer
})

export default RootReducer;