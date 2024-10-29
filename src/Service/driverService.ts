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
  