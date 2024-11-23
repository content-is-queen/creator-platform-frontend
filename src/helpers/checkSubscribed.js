import { auth } from "@/firebase.config";

const checkSubscribed = async () => {
  if (!auth?.currentUser) return false;
  const idTokenResult = await auth.currentUser.getIdTokenResult(true);

  return (
    idTokenResult.claims.subscribed ||
    idTokenResult.claims.role === "admin" ||
    idTokenResult.claims.role === "super_admin"
  );
};

export default checkSubscribed;
