import { requests } from "../connectingServices/connectingMethods";

const requestAllUsers = "GET_ALL_USERS";
const receiveAllUsers = "RECEIVE_ALL_USERS"
const requestBlockUser = "REGUEST_BLOCK_USER";
const receiveBlockUser = "RECEIVE_BLOCK_USER";
const requestSaveUser = "REGUEST_SAVE_USER";
const receiveSaveUser = "RECEIVE_SAVE_USER";
const requestUpdateUser = "REGUEST_UPDATE_USER";
const receiveUpdateUser = "RECEIVE_UPDATE_USER";

export const actions = {
    getAllUsers: (id) => async dispatch => {
        dispatch({ type: requestAllUsers });
        const url = "/api/User/getallusers/" + id;
        const response = await requests.doGet(url);

        dispatch({ type: receiveAllUsers, response });
    },
    blockUser: (id) => async dispatch => {
        dispatch({ type: requestBlockUser });
        const url = "/api/User/blockuser/" + id;
        const response = await requests.doGet(url);

        dispatch({ type: receiveBlockUser, response });
    },
    saveUser: (body) => async dispatch => {
        dispatch({ type: requestUpdateUser });
        const url = "/api/User/admin/update";
        const response = await requests.doPut(url, body);

        dispatch({ type: receiveUpdateUser, response });
    },
    addUser: (body) => async dispatch => {
        dispatch({ type: requestSaveUser });
        const url = "/api/User/admin/add";
        const response = await requests.doPost(url, body);

        dispatch({ type: receiveSaveUser, response });
    }
}