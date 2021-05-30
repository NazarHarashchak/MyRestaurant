const initialState = { result: "", isLoading: false };

const requestAllOrders = "GET_ALL_ORDERS";
const receiveAllOrders = "RECEIVE_ALL_ORDERS";
const requestAllOrders1 = "GET_ALL_ORDERS_1";
const receiveAllOrders1 = "RECEIVE_ALL_ORDERS_1";
const requestDiscard = "REQUEST_DISCARD";
const receiveDiscard = "RECEIVE_DISCARD";

export const reducer = (state, action) => {

    state = state || initialState;

    switch (action.type) {
        case requestDiscard:
            return {
                ...state,
                isLoading: true
            };
        case receiveDiscard:
            return {
                ...state,
                result: action.response,
                isLoading: false
            };
        case requestAllOrders:
            return {
                ...state,
                isLoading: true
            };
        case receiveAllOrders:
            return {
                ...state,
                result: action.response,
                isLoading: false
            };
        case requestAllOrders1:
            return {
                ...state,
                isLoading: true
            };
        case receiveAllOrders1:
            return {
                ...state,
                result: action.response,
                isLoading: false
            };
        default:
            return state;
    }
}