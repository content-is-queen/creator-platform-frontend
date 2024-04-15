import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";

import ProfileIcon from "@/components/ProfileIcon";
import Dots from "@/components/Patterns/Dots";
import Container from "@/components/Container";
import Tag from "@/components/Tag";
import Button from "@/components/Button";
import Modal from "@/components/Modal";
import Text from "@/components/Text";
import { inputStyles } from "./Input";
import {
  getUserProfile,
  updateProfile,
} from "../app/redux/features/profile/profileSlice";

const EditProfileForm = ({ data, setIsOpen }) => {
  const [isLoading, setIsloading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const [profileData, setProfileData] = useState({
    first_name: data?.first_name || "",
    last_name: data?.last_name || "",
    profilePicture: data?.profilePicture || null,
    bio: data?.bio || "",
    role: data?.role,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;
    setProfileData((prevProfileData) => ({
      ...prevProfileData,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    const formData = new FormData();
    e.preventDefault();
    Object.entries(profileData).forEach(([key, value]) => {
      formData.append(key, value);
    });
    await dispatch(updateProfile(formData));
    dispatch(getUserProfile());
    setIsOpen(false);
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
            name="first_name"
            id="first_name"
            value={profileData?.first_name}
            onChange={handleChange}
            className={twMerge(inputStyles.input, "p-1")}
          />
        </div>
        <div className="relative z-0 w-full group">
          <label for="displayName">Last name</label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            value={profileData?.last_name}
            onChange={handleChange}
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
            value={profileData?.bio}
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
  const dispatch = useDispatch();
  const { userProfileData } = useSelector((state) => state.auth);
  const { isGettingUserProfile } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  return (
    <div className="bg-queen-blue text-white relative pt-28 pb-20 overflow-hidden">
      <Container size="4xl" className="space-y-4">
        <ProfileIcon
          photoUrl={userProfileData?.message?.imageUrl}
          className="h-20 w-20"
        />
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
              <EditProfileForm
                data={userProfileData?.message}
                setIsOpen={setIsOpen}
              />
            </Modal>
          </>
        )}
        <div className="max-w-96">
          {isGettingUserProfile && (
            <p className="font-heading uppercase text-xl">Loading ...</p>
          )}
          <h1 className="font-heading uppercase text-2xl">
            {!isGettingUserProfile &&
              userProfileData?.message?.first_name &&
              `${userProfileData?.message?.first_name} ${userProfileData?.message?.last_name}`}
          </h1>
          {user.tags != undefined && (
            <div className="flex gap-2 my-2">
              {user?.tags?.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
          <p className="text-sm mt-1">{userProfileData?.message?.bio}</p>
        </div>
      </Container>
      <Dots className="absolute -right-48 -bottom-60 md:-right-40 md:-bottom-40 text-queen-orange" />
    </div>
  );
};

export default ProfileHero;
