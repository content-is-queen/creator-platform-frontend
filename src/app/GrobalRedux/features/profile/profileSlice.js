"use client";

import FILEAPI from "../../../../api/fileApi";
import API from "../../../../api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const updateProfile = createAsyncThunk("editprofile", async (data) => {
  try {
    const response = await FILEAPI.patch(`/auth/profile`, data);
    const { message } = response?.data;
    toast.success(message || "Success!");
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
});

export const getUserProfile = createAsyncThunk("getUserProfile", async () => {
  try {
    const response = await API.get(`/auth/profile`);
    return response.data;
  } catch (error) {
    return error.response?.data;
  }
});

const initialState = {
  data: null,
  loading: false,
  error: null,
  isGettingUserProfile: false,
  errorOnGettingProfile: null,
  userProfileData: null,
};

const verifySlice = createSlice({
  name: "editprofile",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "An error occurred during login.";
      })
      .addCase(getUserProfile.pending, (state) => {
        state.isGettingUserProfile = true;
        state.errorOnGettingProfile = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isGettingUserProfile = false;
        state.userProfileData = action.payload;
        state.errorOnGettingProfile = null;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isGettingUserProfile = false;
        state.errorOnGettingProfile =
          action.payload || "An error occurred during login.";
      });
  },
});

export default verifySlice.reducer;
