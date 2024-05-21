import API from "@/api/api";

import Profile from "@/components/Profile";

export async function generateStaticParams() {
  // Prevent build failing during workflows build test
  if (process.env.APP_ENV === "development") {
    return [];
  }

  const { data } = await API.get("/auth/users");

  return data.map(({ uid }) => ({ id: uid }));
}

export const dynamicParams = false;

export default async function PublicProfile({ params: { id: uid } }) {
  const { data } = await API.get(`/auth/user/${uid}`);

  return <Profile user={data.message.user} />;
}
