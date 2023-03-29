import axiosStatic, { AxiosError, AxiosResponse } from 'axios';
import isDev from '~/utils/is-dev';

const axios = axiosStatic.create({
  baseURL: import.meta.env.VITE_API,
});

axios.interceptors.request.use(
  async (config) => {
    // TODO add auth token
    // (config.headers as AxiosHeaders).set('Authorization', `Bearer TOKEN`);
    return config;
  },
  (error) => Promise.reject(error)
);

export default abstract class BaseController {
  protected async get<T>(url: string, params?: object): Promise<T> {
    try {
      const res = await axios.get<T>(url, { params });
      isDev && console.log(`GET ${url}`, res.data); // LOG
      return res.data;
    } catch (err) {
      const error = err as AxiosError;
      isDev && console.log(`GET ${url}`, error.response); // LOG
      throw error.response;
    }
  }

  protected async post<T, K>(
    url: string,
    data?: K,
    params?: object
  ): Promise<T> {
    try {
      const res = await axios.post<K, AxiosResponse<T>>(url, data, { params });
      isDev && console.log(`POST ${url}`, res.data); // LOG
      return res.data;
    } catch (err) {
      const error = err as AxiosError;
      isDev && console.log(`POST ${url}`, error.response); // LOG
      throw error.response;
    }
  }

  protected async put<T, K>(url: string, data?: K): Promise<T> {
    try {
      const res = await axios.put<K, AxiosResponse<T>>(url, data);
      isDev && console.log(`PUT ${url}`, res.data); // LOG
      return res.data;
    } catch (err) {
      const error = err as AxiosError;
      isDev && console.log(`PUT ${url}`, error.response); // LOG
      throw error.response;
    }
  }

  protected async delete<T>(url: string, params?: object): Promise<T> {
    try {
      const res = await axios.delete<T>(url, { params });
      isDev && console.log(`DELETE ${url}`, res.data); // LOG
      return res.data;
    } catch (err) {
      const error = err as AxiosError;
      isDev && console.log(`DELETE ${url}`, error.response); // LOG
      throw error.response;
    }
  }
}
