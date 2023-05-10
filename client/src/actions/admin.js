import { AUTH } from '~/constants/actionTypes';
import * as api from '~/api';

// actions creators
export const getAdmin= () => async (dispatch) => {
    try {
        const { data } = await api.getAdmin();

        dispatch({ type: AUTH, payload: data });
    } catch (error) {
        console.log(error);
    }
};