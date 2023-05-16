import { BUY_PRODUCT } from '~/constants/actionTypes';

const initState = {
    cartAr: [],
};

const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case BUY_PRODUCT:
            const productInCart = state.cartAr.find((p) => p._id === action.payload._id);
            if (!productInCart) {
                return {
                    cartAr: [...state.cartAr, action.payload],
                };
            } else {
                let newCart = state.cartAr;
                const objIndex = newCart.findIndex((obj) => obj._id === action.payload._id);

                if (newCart[objIndex].quantity === undefined) {
                    newCart[objIndex].quantity = 2;
                } else {
                    newCart[objIndex].quantity = newCart[objIndex].quantity + 1;
                }
                return { cartAr: [...newCart] };
            }
        default:
            return state;
    }
};

export default cartReducer;
