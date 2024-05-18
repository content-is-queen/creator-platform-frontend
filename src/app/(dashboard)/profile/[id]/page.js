import API from "@/api/api";

import Profile from "@/components/Profile";

export async function generateStaticParams() {
  // Prevent build failing during workflows build test
  if (process.env.APP_ENV === "development") {
    return [];
  }

  const res = await API("/auth/users");

  return res.map(({ uid }) => ({ id: uid }));
}

export const dynamicParams = false;

export default async function PublicProfile({ params: { id: uid } }) {
  const { message: user } = await API(`/auth/user/${uid}`);

  return <Profile user={user} />;
}
