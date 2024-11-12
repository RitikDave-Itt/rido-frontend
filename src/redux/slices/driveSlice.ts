import { Drivestatus, IRideRequestForDriver, IRideTransactionDetail, RideTransactionStatus } from '@/Interfaces/drive';


import { createSlice } from '@reduxjs/toolkit';
import { checkDriveStatus, checkRideTransactionStatus, getRideAndRiderDetails, getRideTransactionDetail, rideCompleted, verifyOtp } from '../thunks/driveThunk';



interface RideState {
  acceptedRide:IRideRequestForDriver|null,
  driveStatus:Drivestatus|null,
  rideTransactionStatus:RideTransactionStatus|null,
  rideTransactionDetail:IRideTransactionDetail|null,

  error: string | null;
}

const initialState: RideState = {
  acceptedRide:null,
  rideTransactionStatus:null,
  driveStatus:null,
  rideTransactionDetail:null,
  error: null,
};




const rideSlice = createSlice({
  name: 'drive',
  initialState,
  reducers: {
    resetDrive: (state) => {
     
      state.acceptedRide = null;  
      state.error = null;
      state.driveStatus = null;
      state.rideTransactionStatus = null;
      state.rideTransactionDetail = null;
    },
    setAcceptedRide: (state, action) => {
      state.acceptedRide = action.payload;
    },
    setDriveStatus: (state, action) => {
      state.driveStatus = action.payload;
    },
    
  },
  extraReducers: (builder) => {
    builder
      
    .addCase(checkDriveStatus.fulfilled, (state, action) => {
      state.driveStatus = action.payload;
    })
    .addCase(getRideAndRiderDetails.fulfilled, (state,action)=>{
        state.acceptedRide = action.payload
    })
    .addCase(verifyOtp.fulfilled, (state) => {  
      state.driveStatus = "InProgress";
    })
    .addCase(rideCompleted.fulfilled, (state) => {  
      state.driveStatus = "Unpaid";
    })
    .addCase(checkRideTransactionStatus.fulfilled, (state,action) => {  
      state.rideTransactionStatus = action.payload;
    })
    .addCase(checkRideTransactionStatus.rejected, (state) => {  
      state.rideTransactionStatus = "Failed";
    })
    .addCase(getRideTransactionDetail.fulfilled, (state,action) => {  
      state.rideTransactionDetail = action.payload;
    })
  },
  
});

export const { resetDrive ,setAcceptedRide,setDriveStatus} = rideSlice.actions;

export default rideSlice.reducer;
