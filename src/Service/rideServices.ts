import { IFareList} from "@/Interfaces/ride";
import axiosRequest from "@/common/request"; 

export const getFareList = async (pickupPoint: string, destination: string): Promise<IFareList> => {
  try {
    const params = {
      pickup: pickupPoint,
      destination: destination,
    };

    const response = await axiosRequest({
      route: '/ride/fare-list', 
      method: 'GET',
      queryParams: params,
    });

    return response.data; 
  } catch (error) {
    console.error('Error fetching fare list:', error);
    throw error; 
  }
};

export const getRideList = async (latitude: string, longitude: string) => {
  try {
    const params = {
      latitude,
      longitude,
    };

    const response = await axiosRequest({
      route: '/ride/get-ride-list', 
      method: 'GET',
      queryParams: params,
    });

    return response.data; 
  } catch (error) {
    console.error('Error fetching ride list:', error);
    throw error; 
  }
};


export const acceptRideRequest = async (rideRequestId:string): Promise<boolean> => {
  try {
    

    const response = await axiosRequest({
      route: `/ride/accept-ride/${rideRequestId}`, 
      method: 'PUT',
    });

    return response.status==200; 
  } catch (error) {
    console.error('Error fetching ride list:', error);
    throw error; 
  }
};

export const createRideTransaction = async (rideRequestId:string)=> {
  try {
    

    const response = await axiosRequest({
      route: `/ride-transaction/transfer/${rideRequestId}`, 
      method: 'POST',
    });

    return response.data; 
  } catch (error) {
    console.error('Error fetching ride list:', error);
    throw error; 
  }
};

export const createReview = async (bookingId:string,rating:number,comment:string = "")=> {
  try {
    

    const response = await axiosRequest({
      route: `/ride-review`, 
      method: 'POST',
      body:{
        bookingId,
        rating,
        comment
      }
    });

    return response.data; 
  } catch (error) {
    console.error('Error fetching ride list:', error);
    throw error; 
  }
};


export const cancelRideByRider = async ()=> {

  try{
    const response = await axiosRequest(
      {
        route:"/ride/cancel-by-rider",
        method:"PUT"
      }

    )
    return response.status==200;

  }

catch(error)  {
  console.error('Error canceling Ride list:', error);
  return false
    
  }
}











