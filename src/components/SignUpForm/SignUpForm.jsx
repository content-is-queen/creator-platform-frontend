"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import API from "@/api/api";
import { useUser } from "@/context/UserContext";
import { useForm } from "react-hook-form";
import { auth } from "@/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

import Text from "@/components/Text";
import Button from "@/components/Button";
import Tabs from "@/components/Tabs";
import { Error } from "@/components/Form";
import SignUpFormStep from "@/components/SignUpForm/SignUpFormStep";

import formData from "@/data/signup_form_data.json";

const SignUpForm = () => {
  const {
    handleSubmit,
    control,
    trigger,
    reset,
    getValues,
    formState: { errors: formErrors },
    clearErrors,
  } = useForm({ mode: "all" });

  const [active, setActive] = useState(formData[0]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalSteps, setTotalSteps] = useState(
    Object.keys(formData[0].steps).length
  );

  const [errors, setError] = useState({});

  const isLastStep = step === totalSteps;

  useEffect(() => {
    clearErrors();
    reset();
    setError({});
    setTotalSteps(Object.keys(active.steps).length);
  }, [active]);

  const onSubmit = async (data) => {
    setLoading(true);
    const { id } = active;
    setError({});

    try {
      const response = await API.post(
        "/auth/signup",
        { ...data, role: id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Login the user if signup is successful
        const {
          data: {
            data: { uid },
          },
        } = response;

        const user = { ...data, uid, role: id };

        const { password, email } = user;

        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch ({ response }) {
      setError({ message: "Something went wrong during sign up" });
      console.error(response.data);
    } finally {
      setLoading(false);
    }
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await API.get(`/auth/check-email?email=${email}`);
      return response.data.exists;
    } catch (error) {
      console.log("Error checking email existence");
      return false;
    }
  };

  const handleClick = async () => {
    setError({});
    let isRegistered;

    if (step === 1) {
      const { email } = getValues();

      // Check if a user has already signed up with inputted email
      isRegistered = await checkEmailExists(email);

      if (isRegistered) {
        setError({ message: "This email address is already in use" });
        return;
      }
    }

    const fields = active.steps[step].fields.reduce((acc, currentValue) => {
      const { name, rules } = currentValue;

      if (rules) {
        return [...acc, name];
      } else {
        return [...acc];
      }
    }, "");

    trigger(fields);

    setTimeout(() => {
      if (isLastStep || Object.keys(formErrors).length > 0 || isRegistered)
        return;

      setStep((prev) => prev + 1);
    }, 0);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8">
          <span className="text-sm mb-1 inline-block">
            Step {step} of {totalSteps}
          </span>
          {step === 1 ? (
            <Tabs options={formData} active={active} setActive={setActive} />
          ) : (
            <Text variant="xl">{active.steps[step].title}</Text>
          )}
        </div>

        <SignUpFormStep
          control={control}
          errors={formErrors}
          fields={active.steps[step].fields}
        />

        <Button
          as="button"
          className="mt-8"
          onClick={handleClick}
          {...(isLastStep ? { type: "submit" } : { type: "button" })}
        >
          {loading && <Button.Spinner />}
          {isLastStep ? "Create Account" : "Next"}
        </Button>

        <Text size="sm" className="mt-4">
          Already registered?{" "}
          <Link href="/login" className="font-medium text-queen-blue">
            Login
          </Link>
        </Text>
      </form>
      {errors?.message && <Error>{errors.message}</Error>}
    </>
  );
};

export default SignUpForm;
