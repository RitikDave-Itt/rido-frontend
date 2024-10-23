import { IUserState } from './../../Interfaces/user';


import { createSlice, PayloadAction } from '@reduxjs/toolkit';




const initialState: IUserState = {
  user: null,
  loading: false,
  error: null,
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUserState['user']>) {
      state.user = action.payload; 
    },
    clearUser(state) {
      state.user = null; 
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload; 
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload; 
    },
   
  },
});


export const { setUser, clearUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
