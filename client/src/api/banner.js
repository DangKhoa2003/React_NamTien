import axios from 'axios';
const url = 'http://localhost:5000/banner';

export const fetchBanners = () => axios.get(url);
export const createBanners = (newBanner) => axios.post(url, newBanner);
export const updateBanners = (id, updatedBanner) => axios.patch(`${url}/${id}`, updatedBanner);
export const deleteBanners = (id) => axios.delete(`${url}/${id}`);