import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";

const Empty = () => {
  const pathname = usePathname();

  console.log("Current Pathname:", pathname);

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
  const credits = user?.profile_meta?.credits || {};

  console.log("Type of credits:", typeof credits);
  console.log("Credits:", credits);

  console.log("User Data:", user);
  console.log("Credits:", credits);

  return (
    <div className="grid grid-cols-3 gap-8">
      {Object.keys(credits).map((key) => (
        <div key={key} className="shadow-lg rounded-lg overflow-hidden">
          <img
            src={credits[key].coverImage}
            alt="Cover"
            className="h-48 w-full object-cover"
            onError={(e) => {
              e.target.src = "default_image_url";
            }} // fallback image if the src fails
          />
          <p className="text-center mt-2 text-lg">{credits[key].role}</p>
          <p className="text-center mt-2 text-lg">{credits[key].episodeName}</p>
        </div>
      ))}
    </div>
  );
};

export default Showcase;
