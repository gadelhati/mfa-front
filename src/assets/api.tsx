import axios from 'axios'
import { getToken } from '../service/service.token'

export const api = axios.create({
  baseURL: "http://localhost:3124/mfa/v1",
  // baseURL: "http://localhost:8000",
  // baseURL: "https://fast2-8edb.onrender.com",
  headers: { 'content-type': 'application/json' }
});

api.interceptors.request.use(async config => {
  const token = getToken().accessToken;
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
})