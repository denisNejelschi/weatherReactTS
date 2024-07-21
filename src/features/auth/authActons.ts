import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { IFormValues, IUserData } from '../../auth/Auth';

export const loginUser = createAsyncThunk(
  'authActons',
  async (data:IFormValues, thunkAPI) => {
    try {
      const response:AxiosResponse<IUserData> = await axios.post('https://dummyjson.com/user/login', data);
      localStorage.setItem('shop-token', response.data.token);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const getUserWithToken = createAsyncThunk(
  'loginToken',
  async (token:string, thunkAPI) => {
    try {
      const response:AxiosResponse<IUserData> = await axios.get('https://dummyjson.com/user/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
