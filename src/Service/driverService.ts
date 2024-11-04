import axiosRequest from "@/common/request";

export const verifyOtpService = async (rideRequestId:string,otp:string): Promise<boolean> => {
    try {
      
  
      const response = await axiosRequest({
        route: `/ride/verify-otp`, 
        method: 'POST',
        body:{
            rideRequestId,
          otp

        }
      });
  
      return response.status==200; 
    } catch (error) {
      console.error('Error fetching ride list:', error);
      throw error; 
    }
  };
  

  export const cancelRideByDriver = async (): Promise<boolean> => {
    try {
      
  
      const response = await axiosRequest({
        route: `/ride/cancel-by-driver`, 
        method: 'PUT',
        
        
      });
  
      return response.status==200; 
    } catch (error) {
      console.error('Error fetching ride list:', error);
      throw error; 
    }
  };
  
  export const updateLocation = async (lat: string, lon: string, vehicleType: number): Promise<boolean> => {
    try {
      const response = await axiosRequest({
        route: `/api/driver-location/update-location?lat=${lat}&lon=${lon}&vehicleType=${vehicleType}`,
        method: 'POST',
        
      });
  
      return response.status === 200; 
    } catch (error) {
      console.error('Error updating location:', error);
      throw error; 
    }
  };
  