"use client";

import ProfileTabs from "@/components/ProfileTabs";
import ProfileOpportunities from "@/components/ProfileOpportunities";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "@/app/redux/features/profile/profileSlice";
import { selectAuth } from "@/app/redux/features/profile/authSlice";
import { useEffect } from "react";
import ProfileHero from "@/components/ProfileHero";
import EditProfileModal from "@/components/EditProfileModal";

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
        <ProfileOpportunities />
      )}
    </>
  );
};

export default Profile;
