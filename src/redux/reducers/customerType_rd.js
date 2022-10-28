import { addCustomerType, updateCustomerType, customerTypes } from "../action_types"

const reducer = (state = [], action) => {
    switch (action.type) {
        case customerTypes:
            return { ...state, list: action.payload };
        case addCustomerType:
            return { ...state, list: [...state.list, action.payload] }
        case updateCustomerType:
            var customers = [];
            state.list.forEach(p => {
                if (p.id === action.payload.id)
                    customers.push(action.payload);
                else customers.push(p);
            });
            return { ...state, list: customers }
        default:
            return state
    }
}

export default reducer