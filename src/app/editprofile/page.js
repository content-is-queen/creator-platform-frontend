"use client";
import React, { useState } from 'react';
import Heading from '@/components/Heading';
import MainNav from '@/components/MainNav';
import Container from '@/components/Container';
import isAuth from '@/helpers/isAuth';
import FILEAPI from '@/api/fileApi';
import { toast } from "react-toastify";

const EditProfile = () => {
  const [isLoading, setIsloading] = useState(false);
  const user = isAuth();
  const [profileData, setProfileData] = useState({
    username: '',
    profilePicture: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setProfileData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };
console.log(profileData);
  const handleSubmit =async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const { username, profilePicture, description } = profileData;
    formData.append('username', username);
    formData.append('profilePicture', profilePicture);
    formData.append('description', description);
      try {
        setIsloading(true);
        const response = await FILEAPI.patch("auth/profile",formData);
        setIsloading(false);
        toast.success(response.data.message);
      } catch (error) {
        toast.error(error.message);
      }
  };

  return (
    <div>
      <MainNav />
      <Container size="2xl">
        <div className="text-center mt-20 mb-16">
          <Heading>Update Profile</Heading>
        </div>

        <form className="max-w-md mx-auto" onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 w-full mb-5 group">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={profileData.username}
                    onChange={handleChange}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder="Username"
                    required
                  />
                </div>
                <div className="relative z-0 w-full mb-5 mt-5 group">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="profilePicture"
                  >
                    Upload Profile Picture
                  </label>
                  <input
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    onChange={handleChange}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  />
                </div>
                <div className="relative z-0 w-full mb-5 group">
                  <label
                    htmlFor="message"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Description..."
                    name="description"
                    value={profileData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {isLoading ? "Updating ...": "Update"}
              </button>
            </form>

      </Container>
    </div>
  );
};

export default EditProfile;
