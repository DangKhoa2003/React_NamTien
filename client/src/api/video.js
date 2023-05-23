import axios from 'axios';
const url = 'https://api-namtien.onrender.com/video';

export const fetchVideo = () => axios.get(url);
export const createVideo = (newVideo) => axios.post(url, newVideo);
export const updateVideo = (id, updatedVideo) => axios.patch(`${url}/${id}`, updatedVideo);
export const deleteVideo = (id) => axios.delete(`${url}/${id}`);