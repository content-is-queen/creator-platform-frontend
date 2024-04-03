import { useState } from "react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";

import { toast } from "react-toastify";

import ProfileIcon from "@/components/ProfileIcon";
import Dots from "@/components/Patterns/Dots";
import Container from "@/components/Container";
import Tag from "@/components/Tag";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Text from "@/components/Text";
import { inputStyles } from "./Input";

const EditProfileForm = () => {
  const [isLoading, setIsloading] = useState(false);
  const router = useRouter();

  const [profileData, setProfileData] = useState({
    displayName: "",
    profilePicture: null,
    description: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProfileData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const { displayName, profilePicture, description, role } = profileData;
    formData.append("displayName", displayName);
    formData.append("profilePicture", profilePicture);
    formData.append("description", description);
    formData.append("role", role);

    try {
      setIsloading(true);
      const response = await FILEAPI.patch("auth/profile", formData);
      setIsloading(false);
      toast.success(response.data.message);
      router.push("/profile");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form
      className="max-w-md mx-auto"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <div className="space-y-10">
        <div className="relative z-0 w-full group">
          <label for="displayName">First name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={profileData?.firstName}
            className={twMerge(inputStyles.input, "p-1")}
          />
        </div>
        <div className="relative z-0 w-full group">
          <label for="displayName">Last name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={profileData?.lastName}
            className={twMerge(inputStyles.input, "p-1")}
          />
        </div>
        <div className="relative z-0 w-full group">
          <label for="profilePicture">Profile picture</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            onChange={handleChange}
            className={twMerge(inputStyles.input, "p-1")}
          />
        </div>

        <div className="relative z-0 w-full group">
          <label for="bio">Bio</label>
          <textarea
            onChange={handleChange}
            className={inputStyles.input}
            id="bio"
            name="bio"
            rows={5}
            value={profileData?.description}
          />
        </div>
        <Button type="submit" as="button">
          Update
        </Button>
      </div>
    </form>
  );
};

const ProfileHero = (user) => {
  const [currentUser, setCurrentUser] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-queen-blue text-white relative pt-28 pb-20 overflow-hidden">
      <Container size="4xl" className="space-y-4">
        <ProfileIcon photoUrl={user?.photoUrl} className="h-20 w-20" />
        {currentUser && (
          <>
            <Button
              as="button"
              onClick={() => setIsOpen(true)}
              type="button"
              variant="yellow"
            >
              Edit Profile
            </Button>

            <Modal isOpen={isOpen} setIsOpen={setIsOpen} heading="Edit profile">
              <EditProfileForm />
            </Modal>
          </>
        )}
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
