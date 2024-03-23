"use client";
import API from "@/api/api";
import MainNav from "@/components/MainNav";
import ProfileHero from "@/components/ProfileHero";
import ProfileTabs from "@/components/ProfileTabs";
import { useEffect, useState } from "react";

const Profile = () => {
  const [userProfile, setUserProfile] = useState([]);
  const fetchUserProfile = async () => {
    try {
      const response = await API.get("auth/profile");
      setUserProfile(response.data.message);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(()=>{
    fetchUserProfile();
  });

  return <div>
  <MainNav />
  {userProfile.length >0 &&<ProfileHero hero={userProfile} />}
  <ProfileTabs />
</div>
};

export default Profile;
