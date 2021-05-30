const initialState = { result: "", isLoading: false };

const requestAllCategories = "GET_ALL_CATEGORIES";
const receiveAllCategories = "RECEIVE_ALL_CATEGORIES"
const requestBlockCategory = "REGUEST_BLOCK_CATEGORY";
const receiveBlockCategory = "RECEIVE_BLOCK_CATEGORY";
const requestSaveCategory = "REGUEST_SAVE_CATEGORY";
const receiveSaveCategory = "RECEIVE_SAVE_CATEGORY";
const requestUpdateCategory = "REGUEST_UPDATE_CATEGORY";
const receiveUpdateCategory = "RECEIVE_UPDATE_CATEGORY";
const requestAllActiveCategories = "GET_ALL_ACTIVE_CATEGORIES";
const receiveAllActiveCategories = "RECEIVE_ALL_ACTIVE_CATEGORIES";

export const reducer = (state, action) => {

    state = state || initialState;

    switch (action.type) {
        case requestAllActiveCategories:
            return {
                ...state,
                isLoading: true
            };
        case receiveAllActiveCategories:
            return {
                ...state,
                categories: action.response,
                isLoading: false
            };
        case requestAllCategories:
            return {
                ...state,
                isLoading: true
            };
        case receiveAllCategories:
            return {
                ...state,
                categories: action.response,
                isLoading: false
            };
        case requestBlockCategory:
            return {
                ...state,
                isLoading: true
            };
        case receiveBlockCategory:
            return {
                ...state,
                categories: action.response,
                isLoading: false
            };
        case requestSaveCategory:
            return {
                ...state,
                isLoading: true
            };
        case receiveSaveCategory:
            return {
                ...state,
                categories: action.response,
                isLoading: false
            };
        case requestUpdateCategory:
            return {
                ...state,
                isLoading: true
            };
        case receiveUpdateCategory:
            return {
                ...state,
                categories: action.response,
                isLoading: false
            };
        default:
            return state;
    }
}