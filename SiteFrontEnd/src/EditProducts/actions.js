import { requests } from "../connectingServices/connectingMethods";

const requestAllCategories = "GET_ALL_CATEGORIES";
const receiveAllCategories = "RECEIVE_ALL_CATEGORIES"
const requestAllActiveCategories = "GET_ALL_ACTIVE_CATEGORIES";
const receiveAllActiveCategories = "RECEIVE_ALL_ACTIVE_CATEGORIES";
const requestBlockCategory = "REGUEST_BLOCK_CATEGORY";
const receiveBlockCategory = "RECEIVE_BLOCK_CATEGORY";
const requestSaveCategory = "REGUEST_SAVE_CATEGORY";
const receiveSaveCategory = "RECEIVE_SAVE_CATEGORY";
const requestUpdateCategory = "REGUEST_UPDATE_CATEGORY";
const receiveUpdateCategory = "RECEIVE_UPDATE_CATEGORY";

export const actions = {
    getAllCategories: () => async dispatch => {
        dispatch({ type: requestAllCategories });
        const url = "/api/ProductType/getallcategories";
        const response = await requests.doGet(url);

        dispatch({ type: receiveAllCategories, response });
    },
    getAllActiveCategories: () => async dispatch => {
        dispatch({ type: requestAllActiveCategories });
        const url = "/api/ProductType/getallcategories";
        const response = await requests.doGet(url);

        dispatch({ type: receiveAllActiveCategories, response });
    },
    blockCategory: (id) => async dispatch => {
        dispatch({ type: requestBlockCategory });
        const url = "/api/ProductType/block/" + id;
        const response = await requests.doGet(url);

        dispatch({ type: receiveBlockCategory, response });
    },
    saveCategory: (body) => async dispatch => {
        dispatch({ type: requestUpdateCategory });
        const url = "/api/ProductType/updatecategory";
        const response = await requests.doPut(url, body);

        dispatch({ type: receiveUpdateCategory, response });
    },
    addCategory: (body) => async dispatch => {
        dispatch({ type: requestSaveCategory });
        const url = "/api/ProductType/addnewcategory";
        const response = await requests.doPost(url, body);

        dispatch({ type: receiveSaveCategory, response });
    }
}