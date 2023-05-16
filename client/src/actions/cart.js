import { BUY_PRODUCT } from '~/constants/actionTypes';

export const buyProduct = (payload) => async (dispatch) => {
    try {
        const data = await payload;
        dispatch({ type: BUY_PRODUCT, payload: data });
    } catch (error) {
        console.log(error);
    }
};
