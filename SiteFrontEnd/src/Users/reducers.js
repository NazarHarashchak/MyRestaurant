const initialState = { result: "", isLoading: false };

const requestAllUsers = "GET_ALL_USERS";
const receiveAllUsers = "RECEIVE_ALL_USERS";
const requestBlockUser = "REGUEST_BLOCK_USER";
const receiveBlockUser = "RECEIVE_BLOCK_USER";
const requestSaveUser = "REGUEST_SAVE_USER";
const receiveSaveUser = "RECEIVE_SAVE_USER";
const requestUpdateUser = "REGUEST_UPDATE_USER";
const receiveUpdateUser = "RECEIVE_UPDATE_USER";

export const reducer = (state, action) => {

    state = state || initialState;

    switch (action.type) {
        case requestAllUsers:
            return {
                ...state,
                isLoading: true
            };
        case receiveAllUsers:
            return {
                ...state,
                users: action.response,
                isLoading: false
            };
        case requestBlockUser:
            return {
                ...state,
                isLoading: true
            };
        case receiveBlockUser:
            return {
                ...state,
                users: action.response,
                isLoading: false
            };
        case requestSaveUser:
            return {
                ...state,
                isLoading: true
            };
        case receiveSaveUser:
            return {
                ...state,
                users: action.response,
                isLoading: false
            };
        case requestUpdateUser:
            return {
                ...state,
                isLoading: true
            };
        case receiveUpdateUser:
            return {
                ...state,
                users: action.response,
                isLoading: false
            };
        default:
            return state;
    }
}