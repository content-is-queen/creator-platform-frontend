"use client";

import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import API from "@/api/api";
import { useForm } from "react-hook-form";
import { auth } from "@/firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";

import formData from "@/data/signup_form_data.json";

import Text from "@/components/Text";
import Button from "@/components/Button";
import Tabs from "@/components/Tabs";
import Subheading from "@/components/Subheading";
import { Error } from "@/components/Form";
import SignUpFormStep from "@/components/SignUpForm/SignUpFormStep";

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

  const searchParams = useSearchParams();
  const router = useRouter();

  const returnTo = searchParams.get("returnTo");

  const DEFAULT_TYPE = "creator";

  const selectType = (id) => {
    return formData.find((i) => i.id === id);
  };

  const [active, setActive] = useState(selectType(DEFAULT_TYPE));
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalSteps, setTotalSteps] = useState(
    Object.keys(formData[0].steps).length
  );

  const [error, setError] = useState({});

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
        const {
          data: {
            data: { uid },
          },
        } = response;

        const user = { ...data, uid, role: id };

        const { password, email } = user;

        await signInWithEmailAndPassword(auth, email, password);
        router.push(returnTo || "/");
      }
    } catch (error) {
      setError({ message: "Something went wrong during sign up" });
      console.log(error);
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

    await trigger(fields);

    setTimeout(() => {
      if (isLastStep || Object.keys(formErrors).length > 0 || isRegistered)
        return;

      setStep((prev) => prev + 1);
    }, 0);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 0 ? (
          <div>
            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={() => {
                  setActive(selectType("creator"));
                }}
                className={clsx(
                  twMerge(
                    "py-4 px-6 rounded text-left outline outline-queen-black/20 outline-1 hover:bg-queen-blue/5 flex gap-4",
                    active.id === "creator" &&
                      "outline-2 outline-queen-blue  bg-queen-blue/5"
                  )
                )}
              >
                <img
                  src="/images/icons/CiQ_widening-participation.svg"
                  alt=""
                  width={50}
                />
                <div>
                  <Subheading as="h2" size="md" className="tracking-wide mb-1">
                    Creator
                  </Subheading>
                  <Text
                    size="sm"
                    className="tracking-wide leading-4 text-queen-black/80"
                  >
                    I want to apply for opportunities and connect with brands
                  </Text>
                </div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActive(selectType("brand"));
                }}
                className={clsx(
                  twMerge(
                    "py-4 px-6 rounded text-left outline outline-queen-black/20 outline-1 hover:bg-queen-blue/5 flex gap-4",
                    active.id === "brand" &&
                      "outline-2 outline-queen-blue  bg-queen-blue/5"
                  )
                )}
              >
                <img
                  src="/images/icons/CiQ_targeted-advertising.svg"
                  alt=""
                  width={50}
                />
                <div>
                  <Subheading as="h2" size="md" className="tracking-wide mb-1">
                    Company
                  </Subheading>
                  <Text
                    size="sm"
                    className="tracking-wide leading-4 text-queen-black/80"
                  >
                    I want to post opportunities and find new talent
                  </Text>
                </div>
              </button>
            </div>
            <Button
              as="button"
              className="mt-8"
              onClick={() => {
                setStep(1);
              }}
              type="button"
            >
              Next
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <span className="text-sm mb-1 inline-block">
                Step {step} of {totalSteps}
              </span>
              {step === 1 ? (
                <Tabs
                  options={formData}
                  active={active}
                  setActive={setActive}
                />
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
          </>
        )}
      </form>
      <Text size="sm" className="mt-4">
        Already registered?{" "}
        <Link
          href={`/login${returnTo ? `?returnTo=${encodeURIComponent(returnTo)}` : ""}`}
          className="font-medium text-queen-black/70 hover:text-queen-blue"
        >
          Login
        </Link>
      </Text>
      {error?.message && <Error>{error.message}</Error>}
    </>
  );
};

export default SignUpForm;
