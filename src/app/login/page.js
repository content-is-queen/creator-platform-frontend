"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import AuthTemplate from '@/components/AuthTemplate';
import Button from '@/components/Button';
import { useForm, Controller } from 'react-hook-form';
import { doSignInWithEmailAndPassword } from '@/firebase/auth';
import isAuth from '@/helpers/isAuth';
import Secure from '@/utils/SecureLs';
import Heading from "@/components/Heading";
import Text from "@/components/Text";


const Login = () => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      if (!isSigningIn) {
        setIsSigningIn(true);
       const { user } = await doSignInWithEmailAndPassword(data.email, data.password);
       const token = await user.getIdToken();
       Secure.setToken(token);
       window.location.href = "/";
      }
    } catch (error) {
      const errorMessageWithoutFirebase = error.message.replace(/firebase: /i, '');
      // toast.error(errorMessageWithoutFirebase || 'Try again!');
    } finally {
      setIsSigningIn(false);
    }
  };

  useEffect(()=>{
const {email} = isAuth();
if(email){
  window.location.href = "/dashboard";
}
  },[]);
  return (
    <AuthTemplate>
    <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
    <Heading tag="h1">Welcome back</Heading>
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
            <Text size="sm" className="mt-2">
          <Link href="#">Forgot password?</Link>
        </Text>
          </>
        )}
      />
      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
    </div>
    <Button tag='button' type="submit" className="text-white bg-queen-orange hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 auth-btn">{isSigningIn ? 'SIGNING IN...' : 'SIGN IN'}</Button>
    
    <Text size="sm" className="mt-2">
        Don't have an account?{" "}
        <Link href="/signup" className="font-medium">
          Signup
        </Link>
      </Text>
  </form>
    </AuthTemplate>
  );
};

export default Login;