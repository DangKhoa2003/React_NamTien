import axios from 'axios';
const url = 'http://localhost:5000/company';

export const fetchCompanies = () => axios.get(url);
export const createCompanies = (newCompany) => axios.post(url, newCompany);
export const updateCompanies = (id, updatedCompany) => axios.patch(`${url}/${id}`, updatedCompany);
export const deleteCompanies = (id) => axios.delete(`${url}/${id}`);