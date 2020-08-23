import {axiosInstance as axios} from "../../utils/utils";
import {urlApi} from '../../utils/globalConst';
import { GET_LOYALTY_STARTED, GET_LOYALTY_SUCCESS, GET_LOYALTY_ERROR } from "./actionsCardLoyalties";

const getLoyaltyStarted = () => ({type: GET_LOYALTY_STARTED});
const getLoyaltySuccess = (payload) => ({type: GET_LOYALTY_SUCCESS, payload: payload});
const getLoyaltyFailure = (error) => ({type: GET_LOYALTY_ERROR, payload: {error}});

//Данный Thunk - добавляет карту лояльности в корзину (пока без номера карты)
export const getLoyaltyCard = (widgetId) => {
    return dispatch => {
        axios
            .put(`${urlApi}/api-v01/cart/${widgetId}/setloyaltycard`, {})
            .then(res => {
                dispatch(getLoyaltySuccess(res.data))
            })
            .catch(err => {
                dispatch(getLoyaltyFailure(err.message))
            })
    }
}

export default {
    getLoyaltyStarted,
    getLoyaltySuccess,
    getLoyaltyFailure,
    getLoyaltyCard
}