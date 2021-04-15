import {authHeaderName} from "./ServiceConstants";

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem(authHeaderName));
    if (user && user.token) {
        return { Authorization: 'Bearer ' + user.token };
    } else {
        return {};
    }
}