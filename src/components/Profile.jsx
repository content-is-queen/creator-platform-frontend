"use client";

import ProfileTabs from "@/components/ProfileTabs";
import ProfileHero from "@/components/ProfileHero";
import EditProfileModal from "@/components/EditProfileModal";
import ProfileOpportunities from "@/components/ProfileOpportunities";

import { useUser } from "@/context/UserContext";
import { useEffect } from "react";

const Profile = () => {
  const { user } = useUser();

  useEffect(() => {}, [user]);

  return (
    <>
      <ProfileHero user={user}>
        <EditProfileModal />
      </ProfileHero>
      {user?.role === "creator" ? (
        <ProfileTabs />
      ) : (
        <ProfileOpportunities uid={user?.uid} />
      )}
    </>
  );
};

export default Profile;
