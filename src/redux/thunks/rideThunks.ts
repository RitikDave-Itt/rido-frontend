import { IRideRequestDetail } from "@/Interfaces/ride";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosRequest from "@/common/request"; 
export const requestRide = createAsyncThunk(
    'ride/requestRide',
    async (rideDetails: IRideRequestDetail, { rejectWithValue }) => {
      try {
        const response = await axiosRequest({
          route: '/ride/ride-request',
          method: 'POST',
          body: rideDetails,
        });

        return response.data.data; 
      } catch (error: any) {
        console.error('Error posting ride request:', error.response?.data || error.message);
        return rejectWithValue(error.response?.data?.message || 'Failed to request ride');
      }
    }
);

export const getRideAndDriverDetail = createAsyncThunk(
    'ride/getRideAndDriverDetail',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosRequest({
          route: `/ride/ride-confirm-details`,
          method: 'GET',
        });

        return response.data;
      } catch (error: any) {
        
        console.error('Error fetching ride and driver details:', error);
        return rejectWithValue('Failed to fetch ride and driver details'); 
      }
    }
);



export const initializeState = createAsyncThunk(
  'ride/initializeState',
  async (_, {dispatch,rejectWithValue }) => {
    try {
      const response = await axiosRequest({
        route: `/ride/check-status`,
        method: 'GET',
      });
      if(response.data=="Accepted"||response.data=="Requested"||response.data=="InProgress"||response.data=="Unpaid"){
        dispatch(getRideAndDriverDetail())}

      return response.data;
    } catch (error: any) {
     
      console.error('Error fetching ride and driver details:', error);
      return rejectWithValue('Failed to fetch ride and driver details'); 
    }
  }
);

export const checkRideStatus = createAsyncThunk(
  'ride/checkRideStatus',
  async (_, {rejectWithValue }) => {
    try {
      const response = await axiosRequest({
        route: `/ride/check-status`,
        method: 'GET',
      });
      

      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else {
        
        return rejectWithValue(response.data?.message || 'Failed to fetch ride and driver details');
      } 
       } catch (error: any) {
     
      console.error('Error fetching ride and driver details:', error);
      return rejectWithValue('Failed to fetch ride and driver details'); 
    }
  }
);