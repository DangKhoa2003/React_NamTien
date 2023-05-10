import { CREATE, UPDATE, DELETE } from '~/constants/actionTypes';
import * as api from '~/api/video.js';

// actions creators
export const getVideo = () => async (dispatch) => {
    try {
        const { data } = await api.fetchVideo();

        dispatch({ type: 'GET_VIDEO', payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const createVideo = (video) => async (dispatch) => {
    try {
        const { data } = await api.createVideo(video);

        dispatch({ type: CREATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const updateVideo = (id, video) => async (dispatch) => {
    try {
        const { data } = await api.updateVideo(id, video);

        dispatch({ type: UPDATE, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const deleteVideo = (id) => async (dispatch) => {
    try {
        await api.deleteVideo(id);

        dispatch({ type: DELETE, payload: id });
    } catch (error) {
        console.log(error);
    }
};