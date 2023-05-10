import { CREATE, UPDATE, DELETE } from '~/constants/actionTypes';
import * as api from '~/api/company.js';

// actions creators
export const getCompanies = () => async (dispatch) => {
    try {
        const { data } = await api.fetchCompanies();

        dispatch({ type: 'GET_COMPANY', payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createCompany = (company) => async (dispatch) => {
    try {
        const { data } = await api.createCompanies(company);

        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateCompany = (id, company) => async (dispatch) => {
    try {
        const { data } = await api.updateCompanies(id, company);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteCompany = (id) => async (dispatch) => {
    try {
        await api.deleteCompanies(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};