import axios from 'axios'
import { usersType, addUsersType, updateUsersType, pageCountType } from '../action_types'
import { axiosConfig, baseUrl } from '../../config'
import { loading, calculatePageNumber, success } from './loader_ac'
import { crud } from '../../config/contants'

export const fetchUsers = (request = { rowCount: 9, pageCount: 0, sort: "id", desc: true }, requestType = 5, data = {}) => {

    let headers = axiosConfig.headers
    let url = `${baseUrl}/api/users`

    switch (requestType) {
        case crud.update:
            if (data.photo && !data.photo.includes("/personal"))
                data.photo = data.photo.replace(/^data:image\/[a-z]+;base64,/, "")
            break;

        default:
            break;
    }

    if (data.password === "&&&&&&") {
        data.password = null;
        data.newPassword = null;
    }

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
                                type: usersType,
                                payload: response.data.data
                            })
                            dispacth(success(true))
                            dispacth({ type: pageCountType, payload: calculatePageNumber(response.data.count, request.rowCount) })
                            break;
                        case crud.create:
                            dispacth({
                                type: addUsersType,
                                payload: response.data.data
                            })
                            dispacth(success(true))
                            break;
                        case crud.update:
                            dispacth({
                                type: updateUsersType,
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