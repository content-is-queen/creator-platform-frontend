"use client";
import API from "@/api/api";
import MainNav from "@/components/MainNav";
import ProfileHero from "@/components/ProfileHero";
import ProfileTabs from "@/components/ProfileTabs";
import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";

const Profile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(false);
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await API.get("auth/profile");
      setUserProfile(response.data.message);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(()=>{
    fetchUserProfile();
  },[]);

  return <div>
  <MainNav />
  {!loading && <ProfileHero hero={userProfile} />}
  {loading && <p>Loading ...</p>}
  <ProfileTabs />
</div>
};

export default Profile;
