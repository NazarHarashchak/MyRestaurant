import { requests } from "../connectingServices/connectingMethods";

const requestAllProducts = "GET_ALL_PRODUCTS";
const receiveAllProducts = "RECEIVE_ALL_PRODUCTS"
const requestAllActiveProducts = "GET_ALL_ACTIVE_PRODUCTS";
const receiveAllActiveProducts = "RECEIVE_ALL_ACTIVE_PRODUCTS"
const requestBlockProduct = "REGUEST_BLOCK_PRODUCT";
const receiveBlockProduct = "RECEIVE_BLOCK_PRODUCT";
const requestSaveProduct = "REGUEST_SAVE_PRODUCT";
const receiveSaveProduct = "RECEIVE_SAVE_PRODUCT";
const requestUpdateProduct = "REGUEST_UPDATE_PRODUCT";
const receiveUpdateProduct = "RECEIVE_UPDATE_PRODUCT";
const requestAddToCart = "REGUEST_TO_CART";
const receiveAddToCart = "RECEIVE_TO_CART";
const requestGetCart = "REGUEST_GET_CART";
const receiveGetCart = "RECEIVE_GET_CART";
const requestRemoveCart = "REGUEST_REMOVE_CART";
const receiveRemoveCart = "RECEIVE_REMOVE_CART";
const requestAddOrder = "REGUEST_ADD_ORDER";
const receiveAddOrder = "RECEIVE_ADD_ORDER";

export const actions = {
    sendOrder: (body) => async dispatch => {
        dispatch({ type: requestAddOrder });

        const url = "/api/Order/add";
        const response = await requests.doPost(url, body);

        localStorage.removeItem("CartProducts");

        let products = null;

        dispatch({ type: receiveAddOrder, products, response });
    },
    removeFromCart: (product) => async dispatch => {
        dispatch({ type: requestRemoveCart });

        let products = JSON.parse(localStorage.getItem("CartProducts"));

        if (products) {
            for (let i = 0; i < products.length; i++) {
                if (products[i].id == product.id) {
                    products.splice(i, 1);
                    break;
                }
            }
            localStorage.setItem("CartProducts", JSON.stringify(products));
        }

        dispatch({ type: receiveRemoveCart, products });
    },
    getFromCart: () => async dispatch => {
        dispatch({ type: requestGetCart });

        let products = JSON.parse(localStorage.getItem("CartProducts"));

        dispatch({ type: receiveGetCart, products });
    },
    addToCart: (product) => async dispatch => {
        dispatch({ type: requestAddToCart });

        let products = JSON.parse(localStorage.getItem("CartProducts"));
        if (!products) {
            products = [];
        }
        products.push(product);
        localStorage.setItem("CartProducts", JSON.stringify(products));

        dispatch({ type: receiveAddToCart, products });
    },
    getAllProducts: () => async dispatch => {
        dispatch({ type: requestAllProducts });
        const url = "/api/Product/getallproducts";
        const response = await requests.doGet(url);

        dispatch({ type: receiveAllProducts, response });
    },
    getAllActiveProducts: (id) => async dispatch => {
        dispatch({ type: requestAllActiveProducts });
        const url = "/api/Product/getallproducts/" + id;
        const response = await requests.doGet(url);

        dispatch({ type: receiveAllActiveProducts, response });
    },
    blockProduct: (id) => async dispatch => {
        dispatch({ type: requestBlockProduct });
        const url = "/api/Product/block/" + id;
        const response = await requests.doGet(url);

        dispatch({ type: receiveBlockProduct, response });
    },
    saveProduct: (body) => async dispatch => {
        dispatch({ type: requestUpdateProduct });
        const url = "/api/Product/updateproduct";
        const response = await requests.doPut(url, body);

        dispatch({ type: receiveUpdateProduct, response });
    },
    addProduct: (body) => async dispatch => {
        dispatch({ type: requestSaveProduct });
        const url = "/api/Product/addnewproduct";
        const response = await requests.doPost(url, body);

        dispatch({ type: receiveSaveProduct, response });
    }
}