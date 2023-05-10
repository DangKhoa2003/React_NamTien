import { CREATE, UPDATE, DELETE } from '~/constants/actionTypes';

const reducer = (videos = [], action) => {
    switch (action.type) {
        case 'GET_VIDEO':
            return action.payload;
        case CREATE:
            return [...videos, action.payload];
        case UPDATE:
            return videos.map((video) => (video._id === action.payload._id ? action.payload : video));
        case DELETE:
            return videos.filter((video) => video._id !== action.payload);
        default:
            return videos;
    }
};

export default reducer;
