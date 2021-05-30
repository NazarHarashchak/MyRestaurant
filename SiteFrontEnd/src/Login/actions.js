import { requests } from "../connectingServices/connectingMethods";

const requestLogin = "LOGIN_REQUEST";
const receiveLogin = "LOGIN_RECEIVE";
const requestRegistrate = "REGISTRATE_REQUEST";
const receiveRegistrate = "REGISTRATE_RECEIVE";

export const actions = {
    loginUser: (body) => async dispatch => {
        dispatch({ type: requestLogin });
        const url = "/api/Authorization/authorizate";
        const response = await requests.doPost(url, body);

        dispatch({ type: receiveLogin, response });
    },
    registrateUser: (body) => async dispatch => {
        dispatch({ type: requestRegistrate });
        const url = "/api/Authorization/registrate";
        const response = await requests.doPost(url, body);

        dispatch({ type: receiveRegistrate, response });
    }
}