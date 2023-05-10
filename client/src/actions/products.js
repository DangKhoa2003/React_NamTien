import { FETCH_ALL, CREATE, UPDATE, DELETE } from '~/constants/actionTypes';
import * as api from '~/api';

// actions creators
export const getProducts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchProduct();

        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createProduct = (product) => async (dispatch) => {
    try {
        const { data } = await api.createProduct(product);

        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateProduct = (id, prod) => async (dispatch) => {
    try {
        const { data } = await api.updateProduct(id, prod);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteProduct = (id) => async (dispatch) => {
    try {
        await api.deleteProduct(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};

export const likeProduct = (id) => async (dispatch) => {
    try {
        const { data } = await api.likeProduct(id);
 
        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
}
