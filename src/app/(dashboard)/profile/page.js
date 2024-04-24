"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserProfile } from "@/app/redux/features/profile/profileSlice";
import { selectAuth } from "@/app/redux/features/profile/authSlice";

import ProfileTabs from "@/components/ProfileTabs";
import ProfileHero from "@/components/ProfileHero";
import EditProfileModal from "@/components/EditProfileModal";
import ProfileOpportunities from "@/components/ProfileOpportunities";

const Profile = () => {
  const { token } = useSelector(selectAuth);
  const dispatch = useDispatch();
  const { userProfileData } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getUserProfile(token));
  }, []);

  return (
    <>
      <ProfileHero userInfo={userProfileData?.message}>
        <EditProfileModal />
      </ProfileHero>
      {userProfileData?.message?.role === "creator" ? (
        <ProfileTabs />
      ) : (
        <ProfileOpportunities id={userProfileData?.message.uid} />
      )}
    </>
  );
};

export default Profile;
