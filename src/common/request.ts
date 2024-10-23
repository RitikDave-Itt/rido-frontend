import axios, { AxiosRequestConfig, Method } from 'axios';

const BASEURL = import.meta.env.VITE_API_BASE_URL;


const axiosInstance = axios.create({
  baseURL: BASEURL
});

interface AxiosRequestParams {
  route: string;                       
  method?: Method;                     
  body?: object;                       
  queryParams?: Record<string, any>;   
  headers?: Record<string, string>;    
}

const axiosRequest = async ({
  route,                             
  method = 'GET',                    
  body = {},                         
  queryParams = {},                  
  headers = {},                      
}: AxiosRequestParams) => {
  try {
    
    const queryString = new URLSearchParams(queryParams as any).toString();
    const url = queryString ? `${route}?${queryString}` : route;

    
    const config: AxiosRequestConfig = {
      url,
      method,
      headers, 
      data: method !== 'GET' ? body : null,  
    };

    
    const response = await axiosInstance(config);

    
    return response.data;
  } catch (error: any) {
    
    console.error('Error making request:', error);

    
    
    
    throw error;
  }
};

export default axiosRequest;
