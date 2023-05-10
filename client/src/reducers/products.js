import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '~/constants/actionTypes';

const reducer = (products = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...products, action.payload];
        case UPDATE:
        case LIKE:
            return products.map((product) => (product._id === action.payload._id ? action.payload : product));
        case DELETE:
            return products.filter((post) => post._id !== action.payload);
        default:
            return products;
    }
};

export default reducer;
