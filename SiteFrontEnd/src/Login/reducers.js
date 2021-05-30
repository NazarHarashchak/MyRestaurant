const requestLogin = "LOGIN_REQUEST";
const receiveLogin = "LOGIN_RECEIVE";
const requestRegistrate = "REGISTRATE_REQUEST";
const receiveRegistrate = "REGISTRATE_RECEIVE";

const initialState = { result: "", isLoading: false };

export const reducer = (state, action) => {

    state = state || initialState;

    switch (action.type) {
        case requestLogin:
            return {
                ...state,
                isLoading: true
            };
        case receiveLogin:
            return {
                ...state,
                user: action.response,
                isLoading: false
            };
        case requestRegistrate:
            return {
                ...state,
                isLoading: true
            };
        case receiveRegistrate:
            return {
                ...state,
                user: action.response,
                isLoading: false
            };
        default:
            return state;
    }
}