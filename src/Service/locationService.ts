import { IAddress } from '@/Interfaces/location';
import axios from 'axios';
import Cookies from 'js-cookie'; 


const BASE_URL = import.meta.env.VITE_API_BASE_URL; 




export interface IAddressResponse {
  displayName: string;
  address: IAddress;
}


export const getAddress = async (latitude: string, longitude: string): Promise<IAddressResponse> => {
  try {
    const token = Cookies.get('accessToken'); 

    const response = await axios.get(`${BASE_URL}/api/location/address`, {
      params: {
        Latitude: latitude,
        Longitude: longitude,
      },
      headers:{
        Authorization: `Bearer ${token}`,
      }
    });

    return response.data as IAddressResponse; 
  } catch (error) {
    console.error('Error fetching address:', error);
    throw error; 
  }
};
