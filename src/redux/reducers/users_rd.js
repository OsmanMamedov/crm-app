import { usersType, addUsersType, updateUsersType } from "../action_types"

const reducer = (state = [], action) => {
    switch (action.type) {
        case usersType:
            return { ...state, list: action.payload };
        case addUsersType:
            return { ...state, list: [...state.list, action.payload] }
        case updateUsersType:
            var users = [];
            state.list.forEach(p => {
                if (p.id === action.payload.id)
                    users.push(action.payload);
                else users.push(p);
            });
            return { ...state, list: users }
        default:
            return state
    }
}

export default reducer