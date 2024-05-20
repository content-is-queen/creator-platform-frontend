"use client";

import { useEffect } from "react";
import { useUser } from "@/context/UserContext";

import CreatorProfileTabs from "@/components/Creator/CreatorProfileTabs/CreatorProfileTabs";
import ProfileHero from "@/components/ProfileHero";
import BrandProfileOpportunities from "@/components/Brand/BrandProfileOpportunities";

const Profile = ({ user: publicUser }) => {
  const { user: localUser } = useUser();

  const user = publicUser || localUser;

  useEffect(() => {}, [user]);

  return (
    <>
      <ProfileHero user={user} />
      {user && user?.role === "creator" && <CreatorProfileTabs />}
      {user && user?.role === "brand" && (
        <BrandProfileOpportunities user={user} />
      )}
    </>
  );
};

export default Profile;
