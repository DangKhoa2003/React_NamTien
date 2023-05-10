import { AUTH } from '~/constants/actionTypes';

const reducer = (admin = [], action) => {
    switch (action.type) {
        case AUTH:
            return action.payload;
        default:
            return admin;
    }
};

export default reducer;
