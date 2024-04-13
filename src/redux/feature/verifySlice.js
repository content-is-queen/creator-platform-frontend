import API from '@/api/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// import Secure from '@/utils/secureLs';


export const verify1 = createAsyncThunk('verify', async data => {
  try {
    const response = await API.post(`/auth/verify`, data);
   console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error.response?.data;
    // throw error?.response?.data;
  }
});

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const verifySlice = createSlice({
  name: 'verify',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(verify1.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verify1.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(verify1.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || 'An error occurred during login.';
      });
  },
});

export default verifySlice.reducer;
