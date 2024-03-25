import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Dots from "@/components/Patterns/Dots";
import Container from "@/components/Container";
import Tag from "@/components/Tag";

const ProfileHero = (user) => {
  return (
    <div className="bg-queen-blue text-white relative pt-28 pb-20 overflow-hidden">
      <Container size="4xl" className="space-y-4">
        <div className="h-20 w-20 bg-queen-black rounded-full flex justify-center items-center">
          {user?.photoUrl ? (
            <img
              className="rounded-full w-full h-full"
              src={user.photoUrl}
              alt={user?.displayName}
            />
          ) : (
            <FontAwesomeIcon className="h-12 w-12" icon={faUser} />
          )}
        </div>
        <div className="max-w-96">
          <h1 className="font-heading uppercase text-2xl">
            {user?.name || user?.company}
          </h1>
          {user.tags != undefined && (
            <div className="flex gap-2 my-2">
              {user?.tags?.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
          <p className="text-sm mt-1">{user?.bio}</p>
        </div>
      </Container>
      <Dots className="absolute -right-48 -bottom-60 md:-right-40 md:-bottom-40 text-queen-orange" />
    </div>
  );
};

export default ProfileHero;
