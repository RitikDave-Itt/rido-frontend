import { createAsyncThunk } from "@reduxjs/toolkit";
import { setLoading, setError, setUser, setIsLoggedIn, clearUser, setWallet } from "@/redux/slices/userSlice";
import { IUser } from "@/Interfaces/user";
import Cookies from "js-cookie";
import axiosRequest from "@/common/request"; 
import {   initializeState } from "./rideThunks";
import { checkDriveStatus } from "./driveThunk";
import { resetRide } from "../slices/rideSlice";
import { resetDrive } from "../slices/driveSlice";


export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (formData: IUser, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosRequest({
        route: '/auth/register',
        method: 'POST',
        body: formData,
      });
      
      dispatch(setUser(response.data.user));
      return response.data;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Signup failed";
      dispatch(setError(errorMsg));
      return rejectWithValue(errorMsg);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (credentials: { email: string; password: string }, { dispatch }) => {
    dispatch(setLoading(true));
    try {
      const response = await axiosRequest({
        route: '/auth/login',
        method: 'POST',
        body: credentials,
      });
      if(response.data.user.role=="Driver"){
        dispatch(initializeState())
      }
      else{
        dispatch(initializeState())

      }

      dispatch(setUser(response.data.user));


      
      Cookies.set("accessToken", response.data.accessToken, {
        secure: true,
        sameSite: "None",
        expires: 60 / (24 * 60),
      });

      Cookies.set("refreshToken", response.data.refreshToken, {
        secure: true,
        sameSite: "None",
        expires: 7,
      });

      Cookies.set("user", JSON.stringify(response.data.user), {
        secure: true,
        sameSite: "None",
        expires: 7,
      });
      
      dispatch(setIsLoggedIn(true));

      return response.data;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Login failed";
      dispatch(setError(errorMsg));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_,{dispatch})=>{
    dispatch(setLoading(true));

    try {
      const response = await axiosRequest({
        route: '/user',
        method: 'GET',
      });

      const user = response?.data?.user;

      dispatch(setUser(user));

      if(user.role=="User"){
        dispatch(initializeState());
      }
      else if(user.role=="Driver"){
        dispatch(checkDriveStatus());
      }

    }
    catch(error){
      console.error(error)
      throw error;
    }
    finally{
      dispatch(setLoading(false));
    }

  }
)


export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, { dispatch }) => {
    dispatch(setLoading(true));

    try {
      
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("user");

      
      dispatch(clearUser());
      dispatch(resetRide());
      dispatch(resetDrive());
       
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);


export const fetchWallet = createAsyncThunk(
  "user/fetchWallet",
  async (_, { dispatch }) => {
    try {
      const response = await axiosRequest({
        route: "/wallet",
        method: "GET"
      });
      
      dispatch(setWallet(response.data));
      
      return response.data; 
    } catch (error) {
      console.log(error);
      throw error; 
    }
  }
);