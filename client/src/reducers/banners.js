import { CREATE, UPDATE, DELETE } from '~/constants/actionTypes';

const reducer = (banners = [], action) => {
    switch (action.type) {
        case 'GET_BANNERS':
            return action.payload;
        case CREATE:
            return [...banners, action.payload];
        case UPDATE:
            return banners.map((banner) => (banner._id === action.payload._id ? action.payload : banner));
        case DELETE:
            return banners.filter((banner) => banner._id !== action.payload);
        default:
            return banners;
    }
};

export default reducer;
