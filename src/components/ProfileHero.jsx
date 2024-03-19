import Dots from "@/components/Patterns/Dots";
import Container from "@/components/Container";
import Tag from "@/components/Tag";

const USER = {
  name: "Kaleshe Alleyne-Vassel",
  tags: ["Editor", "Research", "Marketing"],
  profileImage: { url: "/images/keshe.jpg" },
  bio: "Experienced Software Engineer adept at identifying opportunities to enhance front-end design and improve the UX.",
};

const ProfileHero = () => {
  const { name, tags, profileImage, bio } = USER;

  return (
    <div className="bg-queen-blue text-white relative pt-28 pb-20 overflow-hidden">
      <Container size="4xl" className="space-y-4">
        <div className="h-20 w-20">
          <img
            className="w-full h-full rounded-full object-cover"
            src={profileImage.url}
            alt=""
          />
        </div>
        <div className="space-y-2 max-w-96">
          <h1 className="font-heading uppercase text-2xl">{name}</h1>
          <div className="flex gap-2">
            {tags?.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <p className="text-sm">{bio}</p>
        </div>
      </Container>
      <Dots className="absolute -right-48 -bottom-60 md:-right-40 md:-bottom-40 text-queen-orange" />
    </div>
  );
};

export default ProfileHero;
