import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import Form from "./Form";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "@/firebase.config";

import API from "@/api/api";
import { useUser } from "@/context/UserContext";

import Modal from "@/components/Modal";
import ProfileIcon from "./ProfileIcon";
import Button from "./Button";

const ProfilePhotoUpdateModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState({});
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user, setUser } = useUser();

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    if (!file) return;
    setLoading(true);
    setError({});

    const deleteFile = async (file) => {
      const fileRef = ref(storage, `profilePhotos/${file}`);
      deleteObject(fileRef)
        .then(() => {
          console.log(`${file} deleted successfuly`);
        })
        .catch((error) => {
          console.log(`An error occured when trying to delete: ${file}`);
        });
    };

    let prevFile = user.profilePhoto?.split("%2F").pop() || null;

    if (prevFile) {
      prevFile = prevFile.substring(0, prevFile.lastIndexOf("?"));
      await deleteFile(prevFile);
    }

    try {
      const fileRef = ref(storage, `profilePhotos/${user.uid}-${file.name}`);

      await uploadBytes(fileRef, file);
      const profilePhoto = await getDownloadURL(fileRef);

      const response = await API.post(
        `/auth/user`,
        { profilePhoto },
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
            "Content-Type": "application/json",
          },
        }
      );

      const { data } = response.data;
      setUser({ ...user, ...data });
      setSuccess({
        message: "Your profile photo has been updated successfully",
      });
    } catch (error) {
      console.log(error);
      setError({ message: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-20 w-20 rounded-full">
      <ProfileIcon profilePhoto={user?.profilePhoto} className="h-20 w-20" />
      <button
        className="bg-queen-black h-7 w-7 rounded-full absolute right-0 bottom-0"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <FontAwesomeIcon className="text-white" icon={faCamera} />
      </button>
      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setFile(null);
          setImage(null);
          setSuccess({});
        }}
        className="max-w-lg"
      >
        <Form
          className="flex items-center justify-center w-full text-center"
          error={error}
          setError={setError}
          success={success}
          handleSubmit={handleSubmit}
        >
          <label htmlFor="dropzone-file" className="dropzone">
            <div className="flex flex-col items-center justify-center pt-5 pb-6 cursor-pointer">
              <svg
                className="w-8 h-8 mb-2 text-queen-black/80"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-queen-black/80 font-semibold">
                Click to upload
              </p>
            </div>
            <Form.Input
              type="file"
              id="dropzone-file"
              className="!hidden"
              accept="image/*"
              onChange={handleChange}
            >
              Profile Phto
            </Form.Input>
            {file && (
              <div className="mb-8 flex items-center gap-4">
                {image ? (
                  <div className="h-16 w-16 overflow-hidden rounded-full">
                    <img
                      src={image}
                      alt=""
                      height={50}
                      width={50}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null}
                <p className="text-sm">{file.name}</p>
                <Button type="submit" as="button">
                  {loading && <Button.Spinner />}
                  Update
                </Button>
              </div>
            )}
          </label>
        </Form>
      </Modal>
    </div>
  );
};

export default ProfilePhotoUpdateModal;
