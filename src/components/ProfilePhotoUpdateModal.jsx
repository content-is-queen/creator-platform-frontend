import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebase.config";
import useAuth from "@/hooks/useAuth";
import API from "@/api/api";
import { useUser } from "@/context/UserContext";

import Modal from "@/components/Modal";
import Button from "./Button";
import { Form } from "react-hook-form";

const ProfilePictureUpdateModal = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState({});
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const { token } = useAuth();
  const { user, setUser } = useUser();

  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleClick = async () => {
    if (!file) return;
    setLoading(true);
    setError({});

    const storageRef = ref(storage, `profilePhotos/${user.uid}/${file.name}`);
    await uploadBytes(storageRef, file);
    const profilePhoto = await getDownloadURL(storageRef);

    try {
      const response = await API.post(
        `/auth/user`,
        { profilePhoto },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const { data } = response.data;
        setUser({ ...user, ...data });
        setSuccess({
          message: "Your profile photo has been updated successfully",
        });
      } else {
        setError({ message: response.data.message });
      }
    } catch (error) {
      console.log(error);
      setError({ message: "Something went wrong" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className={className}
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <FontAwesomeIcon icon={faCamera} />
      </button>

      <Modal
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
          setFile(null);
        }}
        className="max-w-lg"
      >
        <div className="flex items-center justify-center w-full text-center">
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
            <input
              type="file"
              id="dropzone-file"
              className="!hidden"
              accept="image/*"
              onChange={handleChange}
            />
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
              </div>
            )}
          </label>
          {error?.message && <Form.Error>{error.message}</Form.Error>}
          {success?.message && <Form.Success>{success.message}</Form.Success>}
        </div>

        {file && (
          <div className="flex gap-1 justify-center">
            <Button type="button" as="button" onClick={handleClick}>
              {loading && <Button.Spinner />}
              Update
            </Button>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ProfilePictureUpdateModal;
