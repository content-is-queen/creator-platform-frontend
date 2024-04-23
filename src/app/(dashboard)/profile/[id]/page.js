import API from "@/api/api";

import ProfileHero from "@/components/ProfileHero";
import ProfileOpportunities from "@/components/ProfileOpportunities";
import ProfileTabs from "@/components/ProfileTabs";

export async function generateStaticParams() {
  // Prevent build failing during workflows build test
  if (process.env.APP_ENV === "development") {
    return [];
  }

  const res = await API.get("/auth/users");

  const { data } = res;

  return data.map(({ uid }) => ({ id: uid }));
}

export const dynamicParams = false;

async function getUser(id) {
  try {
    const res = await API.get(`/auth/user/${id}`);
    const {
      data: { message },
    } = res;
    return message;
  } catch (error) {
    throw new Error("Something went wrong when getting the user");
  }
}

export default async function Profile({ params: { id } }) {
  const user = await getUser(id);

  return (
    <>
      <ProfileHero userInfo={user} />
      {user.role === "creator" ? <ProfileTabs /> : <ProfileOpportunities />}
    </>
  );
}
