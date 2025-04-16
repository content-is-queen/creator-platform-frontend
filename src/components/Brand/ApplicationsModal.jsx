"use client";

import { useEffect, useRef } from "react";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

import { register } from "swiper/element/bundle";
import { Dialog } from "@headlessui/react";

import BrandApplicationCard from "@/components/Brand/BrandApplicationCard";
import SpinnerScreen from "@/components/SpinnerScreen";
import Text from "@/components/Text";
import Card from "../Card";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase.config";

register();

const ApplicationsModal = ({
  opportunityTitle,
  opportunityId,
  open,
  setOpen,
}) => {
  const {
    data: applications,
    isLoading,
    isFetched,
  } = useQuery({
    queryKey: ["application", opportunityId],
    queryFn: async () => {
      const q = query(
        collection(db, "applications"),
        where("opportunityId", "==", opportunityId),
        where("status", "==", "pending")
      );

      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    },
    enabled: !!opportunityId,
  });

  const swiperRef = useRef(null);

  const onReject = () => {
    const index = swiperRef.current.swiper.activeIndex;
    swiperRef.current.swiper.removeSlide(index);
  };

  useEffect(() => {
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
  }, [isFetched]);

  if (isLoading) {
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
            {applications?.length > 0 ? (
              <swiper-container ref={swiperRef} init="false">
                {applications.map((application) => (
                  <swiper-slide key={application.applicationId} class="p-1">
                    <BrandApplicationCard
                      opportunityTitle={opportunityTitle}
                      onReject={onReject}
                      {...application}
                    />
                  </swiper-slide>
                ))}
              </swiper-container>
            ) : (
              <Card>
                <Text className="text-center">No Applications</Text>
              </Card>
            )}
          </ErrorBoundary>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ApplicationsModal;
