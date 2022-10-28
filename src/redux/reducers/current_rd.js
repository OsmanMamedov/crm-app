import {
    addBreadcrumbType,
    breadcrumbType,
    pageTitleType,
    gridListType,
    barListType,
    pageCountType,
    leftMenuType
} from "../action_types"

const reducer = (state = { breadcrumbs: [], bar: true, grid: false, leftMenu: true, pageCount: 0, numbers: [] }, action) => {
    switch (action.type) {
        case pageTitleType:
            return { ...state, title: action.payload }
        case breadcrumbType:
            return { ...state, breadcrumbs: action.payload }
        case gridListType:
            return { ...state, grid: true, bar: false }
        case barListType:
            return { ...state, bar: true, grid: false }
        case pageCountType:
            let numbers = []
            for (let index = 0; index < action.payload; index++) {
                numbers.push(index + 1)
            }
            return { ...state, pageCount: action.payload, numbers }
        case leftMenuType:
            return { ...state, leftMenu: !state.leftMenu }
        default:
            return state
    }
}

export default reducer