"use client";

import { useUserProfile } from "@/contexts/AuthContext/UserProfileContext";

import MainNav from "@/components/MainNav";
import ProfileHero from "@/components/ProfileHero";
import ProfileTabs from "@/components/ProfileTabs";
import ProfileOpportunities from "@/components/ProfileOpportunities";

const Profile = () => {
  const { userProfile } = useUserProfile();

  return (
    <div>
      <MainNav />
      <ProfileHero user={userProfile} />

      {userProfile.role === "creator" ? (
        <ProfileTabs />
      ) : (
        <ProfileOpportunities />
      )}
    </div>
  );
};

export default Profile;
