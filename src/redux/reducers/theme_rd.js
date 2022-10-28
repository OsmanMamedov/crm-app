import { isDarkType, isLightType } from "../action_types"

const reducer = (state = "light", action) => {
    switch (action.type) {
        case isDarkType:
            return "dark"
        case isLightType:
            return "light" 
        default:
            return state
    }
}

export default reducer