"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Keys from "@/utils/keys";
import axios from "axios";
import Secure from "@/utils/SecureLs";

// Helper function to save user profile data in local storage
const saveUserProfileInLocalStorage = (data) => {
  const userProfileDataString = JSON.stringify(data);
  Secure.set("userProfileData", userProfileDataString);
};

export const updateProfile = createAsyncThunk(
  "editprofile",
  async ({ token, formData }) => {
    try {
      Secure.remove("userProfileData");
      const FILEAPI = axios.create({
        baseURL: Keys.DEFAULT_API,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      const response = await FILEAPI.patch(`/auth/profile`, formData);
      const { message } = response?.data;
      toast.success(message || "Success!");
      return response.data;
    } catch (error) {
      return error.response?.data;
    }
  }
);

export const getUserProfile = createAsyncThunk("getProfile", async (token) => {
  try {
    // Check if user profile data exists in local storage
    const userProfileDataFromStorage = Secure.get("userProfileData");
    if (userProfileDataFromStorage) {
      return userProfileDataFromStorage;
    } else {
      const response = await axios.get(`${Keys.DEFAULT_API}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data, "response data ..........");
      // Save user profile data in local storage
      saveUserProfileInLocalStorage(response.data);
      return response.data;
    }
  } catch (error) {
    console.log(error);
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
