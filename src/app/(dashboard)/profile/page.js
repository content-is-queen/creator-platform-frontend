"use client";

import useAuth from "@/hooks/useAuth";

import MainNav from "@/components/MainNav";
import ProfileHero from "@/components/ProfileHero";
import ProfileTabs from "@/components/ProfileTabs";
import ProfileOpportunities from "@/components/ProfileOpportunities";

const Profile = () => {
    const { user } = useAuth();

    return (
        <>
            <ProfileHero user={user} />

            {user.role === "creator" ? (
                <ProfileTabs />
            ) : (
                <ProfileOpportunities />
            )}
        </>
    );
};

export default Profile;
