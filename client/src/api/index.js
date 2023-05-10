import axios from 'axios';
const url = 'https://api-namtien.onrender.com/products';

export const fetchProduct = () => axios.get(url);
export const createProduct = (newProduct) => axios.post(url, newProduct);
export const updateProduct = (id, updatedProduct) => axios.patch(`${url}/${id}`, updatedProduct);
export const deleteProduct = (id) => axios.delete(`${url}/${id}`);
export const likeProduct = (id) => axios.patch(`${url}/${id}/likeProduct`);

export const getAdmin = () => axios.get('https://api-namtien.onrender.com/admin');
