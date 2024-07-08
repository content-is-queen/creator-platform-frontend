"use client";

import { useEffect, useState, useRef } from "react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

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
  open,
  setOpen,
}) => {
  const [applications, setApplications] = useState([]);
  const [loading, setloading] = useState(true);

  const swiperRef = useRef(null);

  const getApplicationsById = async (id) => {
    try {
      const { data } = await API.get(`/applications/opportunity/${id}`);
      setApplications(data?.filter((i) => i.status === "pending"));
    } catch ({ response }) {
      console.error(response.message);
    } finally {
      setloading(false);
    }
  };

  const onReject = () => {
    const index = swiperRef.current.swiper.activeIndex;
    swiperRef.current.swiper.removeSlide(index);
  };

  useEffect(() => {
    getApplicationsById(opportunityId);

    const params = {
      slidesPerView: 1,
      spaceBetween: 25,
      effect: "cards",
      class: "w-full max-h-screen",
    };

    // Swiper initialization
    if (applications && swiperRef.current) {
      Object.assign(swiperRef.current, params);
      swiperRef.current.initialize();
    }
  }, [loading]);

  if (loading) {
    return <SpinnerScreen />;
  }

  return (
    <Dialog
      className="relative z-50"
      open={open}
      onClose={() => setOpen(false)}
    >
      <div className="fixed inset-0 bg-queen-black/75" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-screen max-w-xl relative">
          <ErrorBoundary>
            {applications.length > 0 ? (
              <swiper-container ref={swiperRef} init="false">
                {applications.map((application) => (
                  <swiper-slide key={application.applicationId} class="p-1">
                    <BrandApplicationCard
                      setApplications={setApplications}
                      applications={applications}
                      opportunityTitle={opportunityTitle}
                      opportunityId={opportunityId}
                      onReject={onReject}
                      {...application}
                    />
                  </swiper-slide>
                ))}
              </swiper-container>
            ) : (
              <Card>
                <Text className="text-center">No Applications were found</Text>
              </Card>
            )}
          </ErrorBoundary>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ApplicationsModal;
