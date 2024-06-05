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
            <div key={href} className="space-y-5">
              <img
                src={cover.url || ""}
                alt={`${name} cover`}
                className="object-cover w-full rounded-2xl"
                height={200}
                width={200}
              />
              <div>
                <span className="truncate inline-block max-w-60 w-full leading-none">
                  {name}
                </span>
                <span className="text-queen-black/60 block text-sm leading-none">
                  {role}
                </span>
              </div>
              <Button
                href={href}
                as="a"
                target="_blank"
                rel="noopener noreferrer"
              >
                Listen <span className="sr-only">to {name}</span>
              </Button>
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
