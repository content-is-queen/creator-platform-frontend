
"use client";
import React, { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

import AuthTemplate from "@/components/AuthTemplate";
import Text from "@/components/Text";
import Button from "@/components/Button";
import { db } from '@/firebase/firebase';
import { doCreateUserWithEmailAndPassword } from '@/firebase/auth';
import { addDoc, collection, doc } from 'firebase/firestore';
import { useForm, Controller, useWatch } from 'react-hook-form';

const SignUp =()=>{
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const password = useWatch({ control, name: 'password' });
  const onSubmit = async (data) => {
    try {
      setIsSigningIn(true);
      const { user } = await doCreateUserWithEmailAndPassword(data.email, data.password);
      const brandDocRef = doc(db, 'brand', user.uid);
      const profileCollectionRef = collection(brandDocRef, 'profile');
      const docRef = await addDoc(profileCollectionRef, {
        podcast_name: data.podcast_name,
      });
      setIsSigningIn(false);
      window.location.href = "/login";
    } catch (error) {
      const errorMessageWithoutFirebase = error.message.replace(/firebase: /i, '');
      toast.error(errorMessageWithoutFirebase || 'Try again!');
      console.log(error);
    } finally {
      setIsSigningIn(false);
    }
  };
 return <AuthTemplate>
  <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
  <h1 className="uppercase text-queen-black login-title font-anton">SIGN UP</h1>
  <div className="flex mb-4">
    <button className="text-queen-black hover:underline mr-2 text-2xl mb-4 underline"><p>Brand</p></button>
    <button className="text-gray-400 hover:underline mr-2 text-2xl mb-4"><p>Creator</p></button>
  </div>

  <div className="relative z-0 w-full mb-5 group">
    <input
      type="text"
      autoComplete="off"
      name="podcast_name"
      id="podcast_name"
      className={`block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
        errors.podcast_name ? 'border-red-500' : 'border-queen-black'
      } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-queen-blue peer`}
      placeholder=" "
      {...register('podcast_name', { required: 'Podcast name is required' })}
    />
    <label
      htmlFor="podcast_name"
      className="peer-focus:font-medium absolute text-lg text-queen-black  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
      PODCAST NAME
    </label>
    {errors.podcast_name && <p className="text-red-500 text-sm">{errors.podcast_name.message}</p>}
  </div>

  <div className="relative z-0 w-full mb-5 group">
    <Controller
      name="email"
      control={control}
      defaultValue=""
      rules={{
        required: 'Email address is required',
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: 'Invalid email address',
        },
      }}
      render={({ field }) => (
        <>
          <input
            type="email"
            autoComplete="off"
            {...field}
            className={`block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
              errors.email ? 'border-red-500' : 'border-queen-black'
            } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-queen-blue peer`}
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-lg text-queen-black  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase"
          >
            Email address
          </label>
        </>
      )}
    />
    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
  </div>

  <div className="relative z-0 w-full mb-5 group">
    <Controller
      name="password"
      control={control}
      defaultValue=""
      rules={{
        required: 'Password is required',
        minLength: {
          value: 6,
          message: 'Password must be at least 6 characters',
        },
      }}
      render={({ field }) => (
        <>
          <input
            type="password"
            autoComplete="off"
            {...field}
            className={`block py-3 px-0 w-full text-lg text-queen-black bg-transparent border-0 border-b-2 ${
              errors.password ? 'border-red-500' : 'border-queen-black'
            } text-queen-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-queen-blue peer`}
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-lg text-queen-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase"
          >
            Password
          </label>
        </>
      )}
    />
    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
  </div>

  <div className="relative z-0 w-full mb-5 group">
    <Controller
      name="confirm_password"
      control={control}
      defaultValue=""
      rules={{
        validate: (value) => value === password || 'Passwords do not match',
      }}
      render={({ field }) => (
        <>
          <input
            type="password"
            autoComplete="off"
            {...field}
            className={`block py-3 px-0 w-full text-lg text-queen-black bg-transparent border-0 border-b-2 ${
              errors.confirm_password ? 'border-red-500' : 'border-queen-black'
            } text-queen-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-queen-blue peer`}
            placeholder=" "
            required
          />
          <label
            htmlFor="confirm_password"
            className="peer-focus:font-medium absolute text-lg text-queen-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase"
          >
            Confirm Password
          </label>
        </>
      )}
    />
    {errors.confirm_password && <p className="text-red-500 text-sm">{errors.confirm_password.message}</p>}
  </div>

  <Button tag="button" type="submit">{isSigningIn ? 'Loading...' : 'Create account'}</Button>
<Text size="sm" className="mt-2">
  Already registered?{" "}
  <Link href="/login" className="font-medium">
    Login
  </Link>
</Text>
</form>
  </AuthTemplate>
      };

export default SignUp;