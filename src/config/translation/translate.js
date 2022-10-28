import { trans } from "./";

export const translate = (lang, key) => {
    return trans[lang][key]
}
