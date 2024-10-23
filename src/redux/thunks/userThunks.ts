import { stringify } from './../../../node_modules/postcss/lib/postcss.d';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setLoading, setError, setUser } from "@/redux/slices/userSlice";
import { IUser } from "@/Interfaces/user";
import Cookies from "js-cookie";
import { json } from 'stream/consumers';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const signupUser = createAsyncThunk(
  "user/signupUser",
  async (formData: IUser, { dispatch, rejectWithValue }) => {
    dispatch(setLoading(true));
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, formData);
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
      const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
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
