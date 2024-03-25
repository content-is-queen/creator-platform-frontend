"use client";

import useAuth from "@/hooks/useAuth";

import MainNav from "@/components/MainNav";
import ProfileHero from "@/components/ProfileHero";
import ProfileTabs from "@/components/ProfileTabs";
import ProfileOpportunities from "@/components/ProfileOpportunities";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div>
      <MainNav />
      <ProfileHero user={user} />

      {user.role === "creator" ? <ProfileTabs /> : <ProfileOpportunities />}
    </div>
  );
};

export default Profile;
