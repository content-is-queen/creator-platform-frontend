"use client";

import { useEffect, useState, useRef, useCallback } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { register } from "swiper/element/bundle";
import { Dialog } from "@headlessui/react";

import API from "@/api/api";

import ClientApplicationCard from "@/components/Client/ClientApplicationCard";
import Spinner from "@/components/Spinner";
import Text from "@/components/Text";
import clsx from "clsx";
import Card from "../Card";

register();

const ApplicationsModal = ({
  opportunityTitle,
  opportunityId,
  isApplicationsOpen,
  setIsApplicationsOpen,
}) => {
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const swiperElRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!swiperElRef.current) return;
    swiperElRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!swiperElRef.current) return;
    swiperElRef.current.swiper.slideNext();
  }, []);

  const getApplicationsById = async (id) => {
    try {
      const res = await API(`/applications/${id}`);
      setApplications(res.filter((i) => i.status === "pending"));
    } catch (error) {
      throw new Error(
        "Something went wrong when trying to get the applications"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getApplicationsById(opportunityId);
  }, []);

  useEffect(() => {}, [applications]);

  useEffect(() => {
    if (swiperElRef.current) {
      console.log(swiperElRef);
      swiperElRef.current.addEventListener("swiperslidechange", (e) => {
        console.log("slide changed");
      });
    }
  }, [swiperElRef]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Dialog
      className="relative z-50"
      open={isApplicationsOpen}
      onClose={() => setIsApplicationsOpen(false)}
    >
      <div className="fixed inset-0 bg-queen-black/75" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-screen max-w-xl relative">
          {applications.length > 0 ? (
            <>
              <swiper-container
                ref={swiperElRef}
                space-between="25"
                slides-per-view="1"
                class="w-full max-h-screen"
              >
                {applications.map((application, index) => (
                  <swiper-slide key={index} class="p-1">
                    <ClientApplicationCard
                      key={`application-${index}`}
                      setApplications={setApplications}
                      applications={applications}
                      opportunityTitle={opportunityTitle}
                      opportunity_id={opportunityId}
                      {...application}
                    />
                  </swiper-slide>
                ))}
              </swiper-container>
              <button
                type="button"
                onClick={handlePrev}
                className={clsx(
                  "absolute -left-8 z-10 bg-queen-white shadow-md w-11 rounded-full h-11 flex items-center justify-center -translate-y-1/2 top-1/2"
                )}
              >
                <FontAwesomeIcon className="rotate-180" icon={faArrowRight} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="absolute -right-8 z-10 bg-queen-white shadow-md w-11 rounded-full h-11 flex items-center justify-center -translate-y-1/2 top-1/2"
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </>
          ) : (
            <Card>
              <Text className="text-center">No Applications were found</Text>
            </Card>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ApplicationsModal;
