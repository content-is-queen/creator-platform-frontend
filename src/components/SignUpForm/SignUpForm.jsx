"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import "react-toastify/dist/ReactToastify.css";

import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";

import Text from "@/components/Text";
import Button from "@/components/Button";
import Tabs from "@/components/Tabs";
import SignUpFormStepOne from "@/components/SignUpForm/SignUpFormStepOne";
import SignUpFormStepTwo from "@/components/SignUpForm/SignUpFormStepTwo";
import SignUpFormStepThree from "@/components/SignUpForm/SignUpFormStepThree";

import OPTIONS from "@/data/signup_data.json";

const SignUpForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors: inputErrors },
    clearErrors,
  } = useForm();

  const { signup } = useAuth();
  const router = useRouter();

  const [active, setActive] = useState(OPTIONS[0]);
  const [step, setStep] = useState(1);
  const [totalSteps, setTotalSteps] = useState(
    Object.keys(OPTIONS[0].steps).length
  );
  const [errors, setError] = useState({});

  const isLastStep = step === totalSteps;

  useEffect(() => {
    clearErrors();
    setError({});
    setTotalSteps(Object.keys(active.steps).length);
  }, [active]);

  const onSubmit = async (data, role) => {
    setError({});
    const response = await signup(data, role);
    if (response.status > 200) {
      setError({
        message: "Something went wrong. User sign up failed.",
      });
      return;
    }

    router.push("/verify");
  };

  const handleClick = () => {
    setStep((prev) => prev + 1);
  };

  let Component;

  switch (step) {
    case 1:
      Component = SignUpFormStepOne;
      break;

    case 2:
      Component = SignUpFormStepTwo;
      break;
    case 3:
      Component = SignUpFormStepThree;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-8">
          <span className="text-sm mb-1 inline-block">
            Step {step} of {totalSteps}
          </span>
          {step === 1 && (
            <Tabs options={OPTIONS} active={active} setActive={setActive} />
          )}
        </div>

        <Component
          control={control}
          errors={inputErrors}
          fields={active.steps[step].fields}
        />

        <Button
          as="button"
          type="submit"
          className="mt-8"
          onClick={handleClick}
        >
          {isLastStep ? "Sign Up" : "Next"}
        </Button>

        <Text size="sm" className="mt-4">
          Already registered?{" "}
          <Link href="/login" className="font-medium text-queen-blue">
            Login
          </Link>
        </Text>
      </form>
      {errors?.message && (
        <div className="border border-red-700 bg-red-100 text-red-700 text-sm mt-4 py-2 px-4">
          <p>{errors.message}</p>
        </div>
      )}
    </>
  );
};

export default SignUpForm;
