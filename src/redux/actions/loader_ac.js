import { isLoaderType, resultType } from '../action_types'
export const loading = () => {
    return dispacth => { dispacth({ type: isLoaderType }) }
}
export const success = (payload) => {
    return dispacth => { dispacth({ type: resultType, payload }) }
}
export const calculatePageNumber = (count, countPerPage) => {
    var pageCount = Math.ceil(count / countPerPage)
    if (pageCount === 1)
        return 0
    return pageCount
}
