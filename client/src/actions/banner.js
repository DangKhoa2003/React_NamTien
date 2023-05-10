import { CREATE, UPDATE, DELETE } from '~/constants/actionTypes';
import * as api from '~/api/banner.js';

// actions creators
export const getBanners = () => async (dispatch) => {
    try {
        const { data } = await api.fetchBanners();

        dispatch({ type: 'GET_BANNERS', payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createBanner = (product) => async (dispatch) => {
    try {
        const { data } = await api.createBanners(product);

        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateBanner = (id, prod) => async (dispatch) => {
    try {
        const { data } = await api.updateBanners(id, prod);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteBanner = (id) => async (dispatch) => {
    try {
        await api.deleteBanners(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};