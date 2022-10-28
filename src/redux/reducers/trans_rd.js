import { tr, ru, en } from '../../config/translation';
const reducer = (state = tr, action) => {
    switch (action.type) {
        case "tr":
            return tr;
        case 'en':
            return en;
        case 'ru':
            return ru;
        default:
            return state;
    }
};
export default reducer;