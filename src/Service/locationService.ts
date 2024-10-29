import { IAddress, IAddressResponse, INearbyLocation } from '@/Interfaces/location';
import axiosRequest from '@/common/request'; 

export const getAddress = async (latitude: string, longitude: string): Promise<IAddressResponse> => {
  try {
    const params = {
      Latitude: latitude,
      Longitude: longitude,
    };

    const response = await axiosRequest({
      route: '/location/address',
      method: 'GET',
      queryParams: params,
    });

    return response.data ; 
  } catch (error) {
    console.error('Error fetching address:', error);
    throw error; 
  }
};

export const getNearbyAddress = async (destination: string, address: IAddress): Promise<INearbyLocation[]> => {
  try {
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

    const response = await axiosRequest({
      route: '/location/nearby-places',
      method: 'GET',
      queryParams: params,
    });

    return response.data ; 
  } catch (error) {
    console.error('Error fetching nearby address:', error);
    throw error; 
  }
};
