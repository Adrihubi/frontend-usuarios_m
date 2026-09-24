import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' }
});

export const listarUsuarios = () => api.get('/');
export const obtenerUsuario = (id) => api.get(`/${id}`);
export const crearUsuario = (data) => api.post('/', data);
export const actualizarUsuario = (id, data) => api.put(`/${id}`, data);
export const eliminarUsuario = (id) => api.delete(`/${id}`);
