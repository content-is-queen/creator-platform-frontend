"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useForm } from "react-hook-form";
import useAuth from "@/hooks/useAuth";

import Text from "@/components/Text";
import Button from "@/components/Button";
import Tabs from "@/components/Tabs";
import { Error } from "@/components/Form";
import SignUpFormStep from "@/components/SignUpForm/SignUpFormStep";

import OPTIONS from "@/data/signup_data.json";

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
  const { signup, checkEmailExists } = useAuth(); // Get checkEmailExists from useAuth
  const router = useRouter();

  const [active, setActive] = useState(OPTIONS[0]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalSteps, setTotalSteps] = useState(
    Object.keys(OPTIONS[0].steps).length
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
      const response = await signup(data, id);

      if (response.status > 200) {
        setError({ message: response.message });
        throw new Error(
          response.message || "Something went wrong when signing up"
        );
      }

      router.push("/verify");
    } catch (err) {
      setError({
        message: "Something went wrong. User sign up failed",
      });
      console.error("Sign up error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = async () => {
    setError({});
    let isRegistered;

    if (step === 1) {
      const { email } = getValues();

      // Check if the email already exists
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
            <Tabs options={OPTIONS} active={active} setActive={setActive} />
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
