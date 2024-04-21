"use client";

import useAuth from "@/hooks/useAuth";

import ProfileHero from "@/components/ProfileHero";
import ProfileTabs from "@/components/ProfileTabs";
import ProfileOpportunities from "@/components/ProfileOpportunities";
import { useDispatch, useSelector } from "react-redux";
import Secure from "@/utils/SecureLs";
import { getUserProfile } from "@/app/redux/features/profile/profileSlice";
import { selectAuth } from "@/app/redux/features/profile/authSlice";
import { useEffect } from "react";
import Loading from "../loading";

const Profile = () => {
  const { isAuthenticated, user, token } = useSelector(selectAuth);

  const dispatch = useDispatch();
  const { isGettingUserProfile, userProfileData, errorOnGettingProfile } =
    useSelector((state) => state.profile);
  useEffect(() => {
    if (token) {
      dispatch(getUserProfile(token));
    }
  }, [dispatch]);
  return (
    <>
      {userProfileData ? (
        <>
          {userProfileData?.message && (
            <ProfileHero userInfo={userProfileData?.message} />
          )}
          {userProfileData?.message?.role === "creator" ? (
            <ProfileTabs />
          ) : (
            <ProfileOpportunities />
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Profile;
