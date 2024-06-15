import { notFound } from "next/navigation";

import API from "@/api/api";

import Profile from "@/components/Profile";

export default async function PublicProfile({ params: { id: uid } }) {
  const { data } = await API.get(`/auth/user/${uid}`);

  if (!data) {
    return notFound();
  }

  return <Profile user={data.message} />;
}
