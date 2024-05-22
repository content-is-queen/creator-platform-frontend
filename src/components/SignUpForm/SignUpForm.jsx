"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import API from "@/api/api";

import { useForm } from "react-hook-form";

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
  const router = useRouter();

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

      router.push("/verify");
    } catch ({ response: { data } }) {
      setError({ message: data.message });
    } finally {
      setLoading(false);
    }
  };

  // TODO: Replace with check to our API
  const checkIfRegistered = async (email) => {
    return Promise.resolve(false);
  };

  const handleClick = async () => {
    setError({});
    let isRegistered;

    // Check if the supplied email address is already registered before letting user progress
    if (step === 1) {
      const { email } = getValues();

      isRegistered = await checkIfRegistered(email);
      if (isRegistered) {
        setError({ message: "This email address is already in use" });
      }
    }

    // Create an array of the current steps required fields
    const fields = active.steps[step].fields.reduce((acc, currentValue) => {
      const { name, rules } = currentValue;

      if (rules) {
        return [...acc, name];
      } else {
        return [...acc];
      }
    }, "");

    // Check if fields required for current step are valid
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

        {/* TODO: Disable button if required fields aren't filled in */}
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
