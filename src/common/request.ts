import axios, { AxiosRequestConfig, Method } from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const BASEURL = import.meta.env.VITE_API_BASE_URL;


const axiosInstance = axios.create({
  baseURL: BASEURL,
});

interface AxiosRequestParams {
  route: string;
  method?: Method;
  body?: object;
  queryParams?: Record<string, any>;
  headers?: Record<string, string>;
}


axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refreshToken');
        if (!refreshToken) {
          return;
        }

        const { data } = await axios.post(
          `${BASEURL}/auth/refresh-token`, 
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );
        
        Cookies.set('accessToken', data.accessToken);
        Cookies.set('refreshToken', data.refreshToken);

        
        originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

        
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        
        console.error('Token refresh failed:', refreshError);
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        const navigate = useNavigate();
        navigate('/login'); 

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const axiosRequest = async ({
  route,
  method = 'GET',
  body = {},
  queryParams = {},
  headers = {},
}: AxiosRequestParams) => {
  const queryString = new URLSearchParams(queryParams as any).toString();
  const url = queryString ? `${route}?${queryString}` : route;

  const config: AxiosRequestConfig = {
    url,
    method,
    headers: { 
      ...headers, 
      Authorization: `Bearer ${Cookies.get('accessToken')}` 
    },
    data: method !== 'GET' ? body : null,
  };

  try {
    const response = await axiosInstance(config);
    return response;
  } catch (error) {
    console.error('Error making request:', error);
    throw error;
  }
};

export default axiosRequest;
