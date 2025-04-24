import { auth } from "@/firebase.config";

const checkSubscribed = async () => {
  const user = auth?.currentUser;

  const { claims } = await user.getIdTokenResult(true);

  if (/^(admin|super_admin)$/i.test(claims.role)) {
    return true;
  }

  return claims.subscribed;
};

export default checkSubscribed;
