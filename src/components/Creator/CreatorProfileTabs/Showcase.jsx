import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";

import PlayerEmbed from "./PlayerEmbed";

const Empty = () => {
  const pathname = usePathname();

  if (pathname === "/profile") {
    return <>It looks like you haven't added any shows</>;
  }

  return <>No shows</>;
};

const Showcase = () => {
  const { user } = useUser();
  const shows = user?.showcase || [];
  console.log(shows)

  if (shows.length > 0) {
    return (
      <div className="grid grid-cols-3 gap-8">
        {shows.map((show) => (
          <PlayerEmbed key={show.id} {...show} />
        ))}
      </div>
    );
  }

  return <Empty />;
};

export default Showcase;
