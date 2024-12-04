
import { configureStore } from '@reduxjs/toolkit';
import loadingReducer from '@/redux/slices/loadingSlice';
import userReducer from '@/redux/slices/userSlice';


const store = configureStore({
  reducer: {
    loading: loadingReducer,
    user: userReducer,
  },
});

export default store;


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
