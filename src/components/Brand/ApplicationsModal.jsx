"use client";

import clsx from "clsx";

import { useEffect, useState, useRef, useCallback } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { register } from "swiper/element/bundle";
import { Dialog } from "@headlessui/react";

import API from "@/api/api";

import BrandApplicationCard from "@/components/Brand/BrandApplicationCard";
import SpinnerScreen from "@/components/SpinnerScreen";
import Text from "@/components/Text";
import Card from "../Card";

register();

const ApplicationsModal = ({
  opportunityTitle,
  opportunityId,
  isApplicationsOpen,
  setIsApplicationsOpen,
}) => {
  const [applications, setApplications] = useState([]);
  const [loading, setloading] = useState(true);
  const [arrows, setArrows] = useState({ left: false, right: false });

  const swiperRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.slideNext();
  }, []);

  const getApplicationsById = async (id) => {
    try {
      const { data } = await API.get(`/applications/opportunity/${id}`);
      setApplications(data?.filter((i) => i.status === "pending"));
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    if (applications.length > 0) {
      setArrows({ left: false, right: true });
    }
  }, [loading]);

  useEffect(() => {
    getApplicationsById(opportunityId);

    const swiperContainer = swiperRef.current;
    const handleSwiperProgress = (event) => {
      const [swiper] = event.detail;
      console.log(swiper.isBeginning);

      if (swiper.isBeginning) {
        setArrows({ left: false, right: true });
      }

      if (swiper.isEnd) {
        setArrows({ left: true, right: false });
      }

      if (swiper.isBeginning && swiper.isEnd) {
        setArrows({ left: false, right: false });
      }
    };

    if (swiperContainer) {
      swiperContainer.addEventListener("swiperprogress", handleSwiperProgress);
    }

    return () =>
      swiperContainer &&
      swiperContainer.removeEventListener(
        "swiperprogress",
        handleSwiperProgress
      );
  }, [applications]);

  if (loading) {
    return <SpinnerScreen />;
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
                ref={swiperRef}
                space-between="25"
                slides-per-view="1"
                class="w-full max-h-screen"
              >
                {applications.map((application, index) => (
                  <swiper-slide key={index} class="p-1">
                    <BrandApplicationCard
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
              {arrows.left && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className={clsx(
                    "absolute -left-8 z-10 bg-queen-white shadow-md w-11 rounded-full h-11 flex items-center justify-center -translate-y-1/2 top-1/2"
                  )}
                >
                  <FontAwesomeIcon className="rotate-180" icon={faArrowRight} />
                </button>
              )}
              {arrows.right && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute -right-8 z-10 bg-queen-white shadow-md w-11 rounded-full h-11 flex items-center justify-center -translate-y-1/2 top-1/2"
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              )}
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
