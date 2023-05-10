import { CREATE, UPDATE, DELETE } from '~/constants/actionTypes';

const reducer = (companies = [], action) => {
    switch (action.type) {
        case 'GET_COMPANY':
            return action.payload;
        case CREATE:
            return [...companies, action.payload];
        case UPDATE:
            return companies.map((company) => (company._id === action.payload._id ? action.payload : company));
        case DELETE:
            return companies.filter((company) => company._id !== action.payload);
        default:
            return companies;
    }
};

export default reducer;
