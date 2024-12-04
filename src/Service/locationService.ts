import { IAddress, IAddressResponse, INearbyLocation } from '@/Interfaces/location';
import { getAccessToken } from '@/utils/cookies';
import axios from 'axios';


const BASE_URL = import.meta.env.VITE_API_BASE_URL; 






export const getAddress = async (latitude: string, longitude: string): Promise<IAddressResponse> => {
  try {
    const token = getAccessToken();

    const response = await axios.get(`${BASE_URL}/location/address`, {
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


export const getNearbyAddress = async (destination: string, address: IAddress): Promise<INearbyLocation[]> => {
  try {
    const token = getAccessToken(); 

    
    const params = {
      Destination: destination,
      City: address.city,
      County: address.county,
      State: address.state,
      StateCode: address.stateCode ?? '', 
      Postcode: address.postcode,
      Country: address.country,
      Country_code: address.country_code,
    };

    const response = await axios.get(`${BASE_URL}/location/nearby-places`, {
      params, 
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return response.data as INearbyLocation[]; 
  } catch (error) {
    console.error('Error fetching nearby address:', error);
    throw error; 
  }
};

