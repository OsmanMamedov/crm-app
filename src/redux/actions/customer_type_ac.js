import axios from 'axios'
import { customerTypes, addCustomerType, updateCustomerType, pageCountType } from '../action_types'
import { axiosConfig, baseUrl } from '../../config'
import { loading, calculatePageNumber, success } from '../actions/loader_ac'
import { crud } from '../../config/contants'

export const fetchCustomerType = (request = { rowCount: 9, pageCount: 0, sort: "id", desc: true }, requestType = 5, data = {}) => {

    let headers = axiosConfig.headers
    let url = `${baseUrl}/api/customerTypes`

    return dispacth => {
        try {
            if (request.load)
                dispacth(loading())
            axios({
                method: 'POST',
                url,
                headers,
                data: { request, requestType, data }
            })
                .then(response => {
                    if (request.load)
                        dispacth(loading())
                    switch (requestType) {
                        case crud.list:
                            dispacth({
                                type: customerTypes,
                                payload: response.data.data
                            })
                            dispacth(success(true))
                            dispacth({ type: pageCountType, payload: calculatePageNumber(response.data.count, request.rowCount) })
                            break;
                        case crud.create:
                            dispacth({
                                type: addCustomerType,
                                payload: response.data.data
                            })
                            dispacth(success(true))
                            break;
                        case crud.update:
                            dispacth({
                                type: updateCustomerType,
                                payload: response.data.data
                            })
                            dispacth(success(true));
                        case crud.delete:
                            break;
                        default:
                            break;
                    }
                })
                .catch(err => {
                    console.log(err.response);
                })
        } catch (error) {
            console.log(error);
        }
    }
}