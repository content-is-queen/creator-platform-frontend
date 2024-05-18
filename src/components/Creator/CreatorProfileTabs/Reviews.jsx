import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";

const Empty = () => {
  const pathname = usePathname();

  if (pathname === "/profile") {
    return <>You have no reviews</>;
  }

  return <>No reviews</>;
};

const Reviews = () => {
  const { user } = useUser();
  const reviews = user?.reviews || [];

  if (reviews.length > 0) {
    return (
      <div>
        {reviews.map((review) => (
          <></>
        ))}
      </div>
    );
  }

  return <Empty />;
};

export default Reviews;
