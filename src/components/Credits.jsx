import { useUser } from "@/context/UserContext";
import plurise from "@/helpers/plurise";

const Credits = () => {
  const { user } = useUser();

  const LIMIT = 5;

  const creditsUsed =
    user?.opportunitiesPostedCount || user?.opportunitiesAppliedCount;

  return (
    <div className="flex items-center justify-center">
      {plurise("credit", creditsUsed)}
    </div>
  );
};

export default Credits;
