import { IHistory } from './../Interfaces/history';
import axiosRequest from "@/common/request";

export const fetchHistoryData = async (pageNo: number, pageSize: number = 10):Promise<{ items: IHistory[]; totalCount: number }> => {
  try {
    const response = await axiosRequest({
      route: `/bookings/get-bookings?pageNo=${pageNo}&pageSize=${pageSize}`,
      method: 'GET',
    });

    return {
      items: response.data?.data || [],
      totalCount: response.data?.totalItems || 0,
    };
  } catch (error) {
    console.error(error);
    
    return {
        items: [],
        totalCount: 0,
    };
  }
};


export const fetchBookingById = async (rideRequestId:string):Promise<any> => {
  try {
    const response = await axiosRequest({
      route: `/bookings/get-by-id/${rideRequestId}`,
      method: 'GET',
    });

    return {
      bookingData: response.data.bookingData,
      user: response.data?.user,
    };
  } catch (error) {
    console.error(error);
    
    return null;
  }
};

