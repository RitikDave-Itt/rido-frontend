
import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '@/redux/slices/loadingSlice';
import userReducer from '@/redux/slices/userSlice';
import rideReducer from '@/redux/slices/rideSlice';
import driveReducer from "@/redux/slices/driveSlice"



const store = configureStore({
  reducer: {
    loading: loadingReducer,
    user: userReducer,
    ride: rideReducer,
    drive:driveReducer,
  },
});

export default store;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
