"use client";

import { useUser } from "@/context/UserContext";
import NotFound from "@/app/not-found";

const ResourceGuard = ({ children, author }) => {
  const { user } = useUser();
  const isAdmin = /^(admin|super_admin)$/i.test(user?.role);

  if (author !== user.uid && !isAdmin) {
    return <NotFound />;
  }

  return <>{children}</>;
};

export default ResourceGuard;
