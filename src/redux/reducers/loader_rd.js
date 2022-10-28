import {
    isLoaderType
} from '../action_types'
const reducer = (state = { loading: false }, action) => {
    switch (action.type) {
        case isLoaderType:
            return { ...state, loading: !state.loading }
        default:
            return state
    }
}
export default reducer