import { companySettingType, addCompanySettingType, updateCompanySettingType } from "../action_types"

const reducer = (state = [], action) => {
    switch (action.type) {
        case companySettingType:
            return { ...state, list: action.payload };
        case addCompanySettingType:
            return { ...state, list: [...state.list, action.payload] }
        case updateCompanySettingType:
            var company = [];
            state.list.forEach(p => {
                if (p.id === action.payload.id)
                    company.push(action.payload);
                else company.push(p);
            });
            return { ...state, list: company }
        default:
            return state
    }
}

export default reducer