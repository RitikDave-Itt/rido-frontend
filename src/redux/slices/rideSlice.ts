

import { createSlice } from '@reduxjs/toolkit';
import { IDriverDetail, IRideRequestForRider, RideRequestStatus } from '@/Interfaces/ride';
import { checkRideStatus, getRideAndDriverDetail, initializeState, requestRide } from '../thunks/rideThunks';

interface RideState {
  rideRequestId: string | null;
  rideData: IRideRequestForRider | null;
  driver: IDriverDetail|null,

  rideStatus: RideRequestStatus|null;
  error: string | null;
}

const initialState: RideState = {
  rideRequestId: null,
  rideData: null,
  driver: null,

  rideStatus: null,
  error: null,
};




const rideSlice = createSlice({
  name: 'ride',
  initialState,
  reducers: {
    resetRide: (state) => {
      state.rideRequestId = null;
      state.rideData = null;
      state.rideStatus = null;
      state.driver = null;
      state.error = null;
    },
 
    setRideData: (state, action) => {
      state.rideData = action.payload;
    },
    setRideRequestId: (state, action) => {
      state.rideRequestId = action.payload;
    },
    setDriver: (state, action) => {
      state.driver = action.payload;
    },
    setRideStatus: (state, action) => {
      state.rideStatus = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(requestRide.fulfilled, (state, action) => {
        state.rideStatus = 'Requested';
        state.rideRequestId = action.payload; 
      })

      .addCase(checkRideStatus.fulfilled,(state,action)=>{
        state.rideStatus = action.payload; 
      })
      .addCase(initializeState.fulfilled,(state,action)=>{
        state.rideStatus = action.payload; 
      })
    
      .addCase(getRideAndDriverDetail.fulfilled, (state, action) => {

        state.rideData = action.payload.rideRequest;
        
        state.driver = action.payload.driver; 
      })
      
    
  },
});

export const { resetRide  ,setRideData, setRideRequestId, setDriver,setRideStatus} = rideSlice.actions;

export default rideSlice.reducer;
