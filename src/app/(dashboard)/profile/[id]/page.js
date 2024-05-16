import API from "@/api/api";

import ProfileHero from "@/components/ProfileHero";
import BrandProfileOpportunities from "@/components/Brand/BrandProfileOpportunities";
import CreatorProfileTabs from "@/components/Creator/CreatorProfileTabs";

export async function generateStaticParams() {
  // Prevent build failing during workflows build test
  if (process.env.APP_ENV === "development") {
    return [];
  }

  const res = await API("/auth/users");

  return res.map(({ uid }) => ({ id: uid }));
}

export const dynamicParams = false;

export default async function Profile({ params: { id: uid } }) {
  const { message: user } = await API(`/auth/user/${uid}`);

  return (
    <>
      <ProfileHero user={user} />
      {user.role === "creator" ? (
        <CreatorProfileTabs />
      ) : (
        <BrandProfileOpportunities uid={uid} />
      )}
    </>
  );
}
