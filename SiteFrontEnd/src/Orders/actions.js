import { requests } from "../connectingServices/connectingMethods";

const requestAllOrders = "GET_ALL_ORDERS";
const receiveAllOrders = "RECEIVE_ALL_ORDERS";
const requestAllOrders1 = "GET_ALL_ORDERS_1";
const receiveAllOrders1 = "RECEIVE_ALL_ORDERS_1";
const requestDiscard = "REQUEST_DISCARD";
const receiveDiscard = "RECEIVE_DISCARD";

export const actions = {
    discard: (id) => async dispatch => {
        dispatch({ type: requestDiscard });

        const url = "/api/Order/discardorder/" + id;
        const response = await requests.doGet(url);

        dispatch({ type: receiveAllOrders, receiveDiscard });
    },
    getUserOrders: (id) => async dispatch => {
        dispatch({ type: requestAllOrders });

        const url = "/api/Order/getuserorders/" + id;
        const response = await requests.doGet(url);

        dispatch({ type: receiveAllOrders, response });
    },
    getOrders: (id) => async dispatch => {
        dispatch({ type: requestAllOrders1 });

        const url = "/api/Order/getorders";
        const response = await requests.doGet(url);

        dispatch({ type: receiveAllOrders1, response });
    },
    getOrdersDriver: (id) => async dispatch => {
        dispatch({ type: requestAllOrders1 });

        const url = "/api/Order/getdriverorder/" + id;
        const response = await requests.doGet(url);

        dispatch({ type: receiveAllOrders1, response });
    }
}