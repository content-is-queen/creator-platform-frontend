import Link from "next/link";

import AuthTemplate from "@/components/AuthTemplate";
import Button from "@/components/Button";

const SignUp = () => (
  <AuthTemplate>
    <form className="p-2">
      <h1 className="uppercase text-queen-black login-title font-anton">
        SIGN UP
      </h1>
      <div className="flex mb-4">
        <button
          to="/signup"
          className="text-queen-black hover:underline mr-2 text-2xl mb-4 underline"
        >
          <p>Brand</p>
        </button>
        <button
          to="/signup"
          className="text-gray-400 hover:underline mr-2 text-2xl mb-4"
        >
          <p>Creator</p>
        </button>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="text"
          autoComplete="off"
          name="podcast_name"
          id="floating_email"
          className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-queen-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-queen-blue peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium absolute text-lg text-queen-black  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          PODCAST NAME
        </label>
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="email"
          autoComplete="off"
          name="floating_email"
          id="floating_email"
          className="block py-3 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-queen-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-queen-blue peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium absolute text-lg text-queen-black  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase"
        >
          Email address
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          autoComplete="off"
          name="floating_password"
          id="floating_password"
          className="block py-3 px-0 w-full text-lg text-queen-black bg-transparent border-0 border-b-2 text-queen-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-queen-blue peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_password"
          className="peer-focus:font-medium absolute text-lg text-queen-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase"
        >
          Password
        </label>
      </div>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          autoComplete="off"
          name="confirm_password"
          id="floating_password"
          className="block py-3 px-0 w-full text-lg text-queen-black bg-transparent border-0 border-b-2 text-queen-black appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-queen-blue peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="floating_password"
          className="peer-focus:font-medium absolute text-lg text-queen-black dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase"
        >
          confirm Password
        </label>
      </div>
      <Button href="/dashboard">Create account</Button>
    </form>
  </AuthTemplate>
);

export default SignUp;
