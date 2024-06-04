import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";

const Empty = () => {
  const pathname = usePathname();

  if (pathname === "/profile") {
    return (
      <>
        Select your proudest work from your list of credits to add to your
        showcase
      </>
    );
  }

  return <>No shows</>;
};

const Showcase = () => {
  const { user } = useUser();
  const shows = user?.profile_meta?.showcase || [];

  if (shows.length > 0) {
    return <div className="grid grid-cols-3 gap-8"></div>;
  }

  return <Empty />;
};

export default Showcase;
