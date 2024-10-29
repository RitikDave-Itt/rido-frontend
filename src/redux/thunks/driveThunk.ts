import { Drivestatus } from '@/Interfaces/drive';
import axiosRequest from "@/common/request";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { setDriveStatus } from '../slices/driveSlice';


export const acceptRideRequest = createAsyncThunk(
    'drive/acceptRideRequest',
    async (rideRequestId: string, { dispatch,rejectWithValue }) => {
      try {
        const response = await axiosRequest({
          route: `/ride/accept-ride/${rideRequestId}`,
          method: 'PUT',
        });
  
        if (response.status === 200) {
            dispatch(checkDriveStatus());
            
          return true; 
        }
  
        return rejectWithValue('Failed to accept ride request');
      } catch (error: any) {
        console.error('Error accepting ride request:', error);
        return rejectWithValue('Failed to accept ride request');
      }
    }
  );

export const checkDriveStatus = createAsyncThunk(
    'drive/checkRideStatus',
    async (_, { dispatch,rejectWithValue }) => {
      try {
        const response = await axiosRequest({
          route: `/ride/check-status`,
          method: 'GET',
        });
        
        if(response.data=="Accepted"||response.data=="Requested"||response.data=="InProgress"){
          dispatch(getRideAndRiderDetails())}
        return response.data;
      } catch (error: any) {
       
        console.error('Error fetching ride and driver details:', error);
        return rejectWithValue('Failed to fetch ride and driver details'); 
      }
    }
  );

  export const getRideAndRiderDetails = createAsyncThunk(
    'drive/getRideAndRiderDetails',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosRequest({
          route: `/ride/driver`,
          method: 'GET',
        });
  
        return response.data;
      } catch (error: any) {
       
        console.error('Error fetching ride and driver details:', error);
        return rejectWithValue('Failed to fetch ride and driver details'); 
      }
    }
  );




  export const verifyOtp = createAsyncThunk(
    'drive/verifyOtp',
    async ({ rideRequestId, otp }: { rideRequestId: string; otp: string }, {dispatch, rejectWithValue }) => {
      try {
        const response = await axiosRequest({
          route: `/ride/verify-otp`,
          method: 'POST',
          body: {
            rideRequestId,
            otp,
          },
        });
            dispatch(checkDriveStatus());
        
  
        return response.status === 200;
      } catch (error: any) {
        console.error('Error verifying OTP:', error);
        return rejectWithValue('Failed to verify OTP');
      }
    }
  );

  export const rideCompleted = createAsyncThunk(
    'ride/rideCompleted',
    async (_, { rejectWithValue }) => {
      try {
        const response = await axiosRequest({
          route: `/ride/completed`,
          method: 'PUT',
         
        });
  
        return response.status === 200;
      } catch (error: any) {
        console.error('Error verifying OTP:', error);
        return rejectWithValue('Failed to verify OTP');
      }
    }
  );


  

  
  export const checkRideTransactionStatus = createAsyncThunk(
    'drive/rideTransactionStatus',
    async ({ rideRequestId }: { rideRequestId: string }, { rejectWithValue, dispatch }):Promise<any> => {
      try {
        const response = await axiosRequest({
          route: `/ride-transaction/status/${rideRequestId}`,
          method: 'GET',
        });
  
        
        if (response.data === "Pending") {
          
          await new Promise(resolve => setTimeout(resolve, 2000)); 
          dispatch(checkRideTransactionStatus({ rideRequestId })); 
        }
        else{
          dispatch(setDriveStatus("Completed"))
          dispatch(getRideTransactionDetail(rideRequestId))


        }
        console.log(response.data)
  
        return response.data; 
      } catch (error: any) {
        console.error('Error checking ride transaction status:', error);
        return rejectWithValue('Failed to check ride transaction status');
      }
    }
  );

  export const getRideTransactionDetail = createAsyncThunk(
    'drive/getRideTransactionDetail',
    async (rideRequestId: string, { rejectWithValue }): Promise<any> => {
      try {
        const response = await axiosRequest({
          route: `/ride-transaction/by-ride-request-id/${rideRequestId}`,
          method: 'GET'
        });
        return response.data;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );