import { resultType, isCameDataType, isComingDataType } from '../action_types'
const reducer = (state = { success: false, change: false, came: false }, action) => {
    switch (action.type) {
        case resultType:
            return { ...state, success: action.payload, change: !state.change }
        case isCameDataType:
            return { ...state, came: true }
        case isComingDataType:
            return { ...state, came: false }
        default:
            return state
    }
}
export default reducer