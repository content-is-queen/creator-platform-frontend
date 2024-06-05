import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";
import Button from "@/components/Button";

const Empty = () => {
  const pathname = usePathname();

  if (pathname === "/profile") {
    return <>Edit your profile to add your proudest credits to your showcase</>;
  }

  return <>No shows</>;
};

const Showcase = () => {
  const { user } = useUser();
  const creditsToShow = user?.showcase ? JSON.parse(user.showcase) : [];

  const credits = user?.credits ? JSON.parse(user.credits) : [];

  const showcase = credits.reduce((acc, current) => {
    if (creditsToShow.includes(current.name)) {
      return [...acc, current];
    }
    return [...acc];
  }, []);

  return (
    <div>
      {showcase.length > 0 ? (
        <div className="grid grid-cols-3 gap-6">
          {showcase.map(({ name, href, cover, role }) => (
            <div key={href} className="space-y-5 relative group">
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={cover.url || ""}
                  alt={`${name} cover`}
                  className="object-cover w-full transition group-hover:scale-105"
                  height={200}
                  width={200}
                />
                <img
                  src="/images/spotify.svg"
                  alt="Spotify"
                  height={25}
                  width={25}
                  className="absolute right-4 bottom-4"
                />
              </div>
              <div>
                <a
                  href={href}
                  className="truncate inline-block max-w-60 w-full leading-none after:absolute after:w-full after:h-full after:left-0 after:top-0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">Listen to</span> {name}
                </a>
                <span className="text-queen-black/60 block text-sm leading-none">
                  {role}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default Showcase;
