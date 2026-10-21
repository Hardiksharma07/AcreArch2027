import axios from 'axios';
import { fallbackProperties, filterFallback } from '../assets/propertyFallback';
import { authService } from './authService';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', timeout: 15000 });
const unwrap = (response) => response.data.data;
api.interceptors.request.use(config=>{const token=authService.getToken();if(token)config.headers.Authorization=`Bearer ${token}`;return config});
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      authService.logout();
      if (window.location.pathname.startsWith('/admin')) {
        window.location.assign('/admin/login?session=expired');
      }
    }
    return Promise.reject(error);
  }
);

export const propertyService = {
  list: async (filters = {}) => {
    try { return await api.get('/properties', { params: filters }).then(unwrap); }
    catch (error) { if (!error.response) return filterFallback(filters); throw error; }
  },
  get: async (id) => {
    try { return await api.get(`/properties/${encodeURIComponent(id)}`).then(unwrap); }
    catch (error) { const item=fallbackProperties.find(property=>property.id===id); if(!error.response&&item)return item; throw error; }
  },
  getMedia: (id) => api.get(`/media/properties/${encodeURIComponent(id)}`).then(unwrap),
  previewGoogleDrive: (folderUrl) => api.post('/media/google-drive/preview', { folderUrl }).then(unwrap),
  create: (property) => api.post('/properties', property).then(unwrap),
  update: (id, property) => api.put(`/properties/${encodeURIComponent(id)}`, property).then(unwrap),
  remove: (id) => api.delete(`/properties/${encodeURIComponent(id)}`).then(unwrap)
};

export function getApiError(error) {
  return error.response?.data?.message || error.message || 'Unable to reach the AcreArch service.';
}
