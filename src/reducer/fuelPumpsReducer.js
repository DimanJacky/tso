import { GET_FUELPUMPS_STARTED, GET_FUELPUMPS_SUCCESS, GET_FUELPUMPS_FAILURE, GET_LOCK, GET_LOCK_ERROR, GET_UNLOCK, GET_UNLOCK_ERROR, GET_NUMBER_GAS } from '../actions/actionsFuelPumps/actionsFuelPumps'

const initialState = {
    fuelPumps: [],
    loadingFuelPumps: false,
    error: "",
    responseLock: "",
    errorLock: "",
    responseUnLock: "",
    errorUnLock: "",
    numberSelectGas: 0
}

export default function FuelPumpsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_FUELPUMPS_STARTED:
            return {
                ...state,
                loadingFuelPumps: true,
            };
        case GET_FUELPUMPS_SUCCESS:
            return {
                ...state,
                loadingFuelPumps: false,
                fuelPumps: action.payload,
            };
        case GET_FUELPUMPS_FAILURE:
            let errorMessage = action.payload;
            return {
                ...state,
                loadingFuelPumps: false,
                error: errorMessage.error
            };
        case GET_LOCK:
            return {
                ...state,
                responseLock: action.payload
            }
        case GET_LOCK_ERROR:
            return {
                ...state,
                errorLock: action.payload
            }
        case GET_UNLOCK:
            return {
                ...state,
                responseUnLock: action.payload
            }
        case GET_UNLOCK_ERROR:
            return {
                ...state,
                errorUnLock: action.payload
            }
        case GET_NUMBER_GAS:
            return {
                ...state,
                numberSelectGas: action.payload
            }
        default:
            return state;
    }
}