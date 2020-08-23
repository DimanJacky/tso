import {axiosInstance as axios} from "../../utils/utils";
import {urlApi} from '../../utils/globalConst';
import {GET_STATUS_DEVICE_STARTED, GET_STATUS_DEVICE_SUCCESS, GET_STATUS_DEVICE_FAILURE} from "./actionsStatusDevice";

export const getStatusDeviceStarted = () => ({type: GET_STATUS_DEVICE_STARTED});
export const getStatusDeviceSuccess = (payload) => ({type: GET_STATUS_DEVICE_SUCCESS, payload: payload});
export const getStatusDeviceFailure= (error) => ({type: GET_STATUS_DEVICE_FAILURE, payload: {error}});

//Данный thunk - получает данные о статусе доступного обарудования
export const getDataDeviceStatus = (payload) => {
    return dispatch => {
        dispatch(getStatusDeviceStarted())
        axios
            .get(`${urlApi}/api-v01/payment/${payload}/list`, {})
            .then(res => {
                dispatch(getStatusDeviceSuccess(res.data))
            })
            .catch(err => {
                dispatch(getStatusDeviceFailure(err.message))
            })
    }
}

export default {
    getStatusDeviceStarted,
    getStatusDeviceSuccess,
    getStatusDeviceFailure,
    getDataDeviceStatus
}