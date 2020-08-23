import {combineReducers} from "redux";
import OptModeReducer from './operatingModeReducer';
import AuthReducer from './authReducer';
import FuelPumpsReducer from "./fuelPumpsReducer";
import ReducerStageProgress from "./reducerStageProgress";
import SelectFuelReducer from "./selectFuelReducer";
import OrderFuelReducer from "./orderFuelReducer";
import StatusDeviceReducer from "./statusDeviceReducer";
import PayOrderReducer from "./payOrderReducer";
import LoyaltiesCardReducer from "./loyaltiesReducer";
import ReturnOrderReducer from "./returnOrderReducer";

//Основной Reducer - который принимает остальные reducer
export default combineReducers({
    OptModeReducer,
    AuthReducer,
    FuelPumpsReducer,
    ReducerStageProgress,
    SelectFuelReducer,
    OrderFuelReducer,
    StatusDeviceReducer,
    PayOrderReducer,
    LoyaltiesCardReducer,
    ReturnOrderReducer
});