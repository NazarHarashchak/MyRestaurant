import { requests } from "../connectingServices/connectingMethods";

const requestUser = "REQUEST_USER";
const receiveUser = "RESEIVE_USER";
const requestUserSave = "REQUEST_USER_SAVE";
const receiveUserSave = "RECEIVE_USER_SAVE";

export const actions = {
    getUser: (id) => async dispatch => {
        dispatch({ type: requestUser });
        const url = "/api/user/getuser/" + id;
        const response = await requests.doGet(url);

        dispatch({ type: receiveUser, response });
    },
    saveUser: (body) => async dispatch => {
        dispatch({ type: requestUserSave });
        const url = "/api/user/saveuser";
        const response = await requests.doPost(url, body);

        dispatch({ type: receiveUserSave, response });
    }
}