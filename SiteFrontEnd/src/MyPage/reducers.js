const requestUser = "REQUEST_USER";
const receiveUser = "RESEIVE_USER";
const requestUserSave = "REQUEST_USER_SAVE";
const receiveUserSave = "RECEIVE_USER_SAVE";

const initialState = { result: "", isLoading: false };

export const reducer = (state, action) => {

    state = state || initialState;

    switch (action.type) {
        case requestUser:
            return {
                ...state,
                isLoading: true
            };
        case receiveUser:
            return {
                ...state,
                user: action.response,
                isLoading: false
            };
        case requestUserSave:
            return {
                ...state,
                isLoading: true
            };
        case receiveUserSave:
            return {
                ...state,
                user: action.response,
                isLoading: false
            };
        default:
            return state;
    }
}