const initialState = { result: "", isLoading: false };

const requestAllProducts = "GET_ALL_PRODUCTS";
const receiveAllProducts = "RECEIVE_ALL_PRODUCTS"
const requestBlockProduct = "REGUEST_BLOCK_PRODUCT";
const receiveBlockProduct = "RECEIVE_BLOCK_PRODUCT";
const requestSaveProduct = "REGUEST_SAVE_PRODUCT";
const receiveSaveProduct = "RECEIVE_SAVE_PRODUCT";
const requestUpdateProduct = "REGUEST_UPDATE_PRODUCT";
const receiveUpdateProduct = "RECEIVE_UPDATE_PRODUCT";
const requestAllActiveProducts = "GET_ALL_ACTIVE_PRODUCTS";
const receiveAllActiveProducts = "RECEIVE_ALL_ACTIVE_PRODUCTS"
const requestAddToCart = "REGUEST_TO_CART";
const receiveAddToCart = "RECEIVE_TO_CART";
const requestGetCart = "REGUEST_GET_CART";
const receiveGetCart = "RECEIVE_GET_CART";
const requestRemoveCart = "REGUEST_REMOVE_CART";
const receiveRemoveCart = "RECEIVE_REMOVE_CART";
const requestAddOrder = "REGUEST_ADD_ORDER";
const receiveAddOrder = "RECEIVE_ADD_ORDER";

export const reducer = (state, action) => {

    state = state || initialState;

    switch (action.type) {
        case requestAddOrder:
            return {
                ...state,
                isLoading: true
            };
        case receiveAddOrder:
            return {
                ...state,
                cartProducts: action.products,
                result: action.response,
                isLoading: false
            };
        case requestRemoveCart:
            return {
                ...state,
                isLoading: true
            };
        case receiveRemoveCart:
            return {
                ...state,
                cartProducts: action.products,
                isLoading: false
            };
        case requestGetCart:
            return {
                ...state,
                isLoading: true
            };
        case receiveGetCart:
            return {
                ...state,
                cartProducts: action.products,
                isLoading: false
            };
        case requestAddToCart:
            return {
                ...state,
                isLoading: true
            };
        case receiveAddToCart:
            return {
                ...state,
                cartProducts: action.products,
                isLoading: false
            };
        case requestAllActiveProducts:
            return {
                ...state,
                isLoading: true
            };
        case receiveAllActiveProducts:
            return {
                ...state,
                products: action.response,
                isLoading: false
            };
        case requestAllProducts:
            return {
                ...state,
                isLoading: true
            };
        case receiveAllProducts:
            return {
                ...state,
                products: action.response,
                isLoading: false
            };
        case requestBlockProduct:
            return {
                ...state,
                isLoading: true
            };
        case receiveBlockProduct:
            return {
                ...state,
                products: action.response,
                isLoading: false
            };
        case requestSaveProduct:
            return {
                ...state,
                isLoading: true
            };
        case receiveSaveProduct:
            return {
                ...state,
                products: action.response,
                isLoading: false
            };
        case requestUpdateProduct:
            return {
                ...state,
                isLoading: true
            };
        case receiveUpdateProduct:
            return {
                ...state,
                products: action.response,
                isLoading: false
            };
        default:
            return state;
    }
}