import { IFareList } from "@/Interfaces/ride";
import { getAccessToken } from "@/utils/cookies";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL; 

export const getFareList = async (pickupPoint: string, destination: string): Promise<IFareList> => {
    try {
      const token = getAccessToken(); 
  
      
      const params = {
        pickup:pickupPoint,
        destination :destination,
        
      };
  
      const response = await axios.get(`${BASE_URL}/ride/fare-list`, {
        params, 
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
  
      return response.data as IFareList; 
    } catch (error) {
      console.error('Error fetching nearby address:', error);
      throw error; 
    }
  };