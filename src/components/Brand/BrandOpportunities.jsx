"use client";

import clsx from "clsx";
import { useState, useRef, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "@/firebase.config";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { register } from "swiper/element/bundle";

import Tabs from "@/components/Tabs";
import Container from "../Container";
import BrandOpportunityCard from "@/components/Brand/BrandOpportunityCard";

import { useUser } from "@/context/UserContext";
import Spinner from "../Spinner";
import Subheading from "../Subheading";
import Text from "../Text";

register();

const BrandOpportunities = () => {
  const OPTIONS = [
    {
      label: "All",
      id: "all",
    },
    {
      label: "Open",
      id: "open",
    },
    {
      label: "In Progress",
      id: "in_progress",
    },
    {
      label: "Complete",
      id: "complete",
    },
  ];

  const { user } = useUser();

  const userId = user?.uid;

  const {
    isPending,
    isError,
    data: opportunities,
    error,
  } = useQuery({
    queryKey: ["opportunities", userId],
    queryFn: async () => {
      const q = query(
        collection(db, "opportunities"),
        where("userId", "==", userId)
      );

      const querySnapshot = await getDocs(q);

      const opportunitiesData = querySnapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((i) => i.status !== "archived");

      setFilteredOpportunities(opportunitiesData);

      return opportunitiesData;
    },
    enabled: !!userId,
  });

  const [active, setActive] = useState(OPTIONS[0]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
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

  const renderArrows = (swiper) => {
    if (swiper.isBeginning && swiper.isEnd) {
      setArrows({ left: false, right: false });
      return;
    }

    if (!swiper.isBeginning && !swiper.isEnd) {
      setArrows({ left: true, right: true });
      return;
    }

    if (swiper.isBeginning) {
      setArrows({ left: false, right: true });
      return;
    }

    if (swiper.isEnd) {
      setArrows({ left: true, right: false });
    }
  };

  useEffect(() => {
    const handleSwiperProgress = (event) => {
      const [swiper] = event.detail;

      renderArrows(swiper);
    };

    const params = {
      slidesPerView: 3,
      spaceBetween: 20,
      watchSlidesProgress: true,
      breakpoints: {
        425: { slidesPerView: 1 },
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      },
      on: {
        init(swiper) {
          renderArrows(swiper);
        },
      },
    };

    // Filter opportunities by their statuses
    setFilteredOpportunities(
      active.id === "all"
        ? opportunities
        : opportunities.filter((i) => i.status === active.id)
    );

    // Swiper initialization
    if (opportunities && swiperRef.current) {
      Object.assign(swiperRef.current, params);
      swiperRef.current.initialize();

      swiperRef.current.addEventListener(
        "swiperprogress",
        handleSwiperProgress
      );
    }

    return () =>
      swiperRef.current
        ? swiperRef.current.removeEventListener(
            "swiperprogress",
            handleSwiperProgress
          )
        : null;
  }, [filteredOpportunities, active]);

  if (isPending)
    return (
      <div className="flex items-center justify-center h-60">
        <Spinner className="h-6 w-6" />
      </div>
    );

  if (opportunities?.length > 0) {
    return (
      <div>
        <Tabs options={OPTIONS} active={active} setActive={setActive} />
        <div className="relative">
          <swiper-container ref={swiperRef} init="false" class="my-6">
            {filteredOpportunities?.length > 0 ? (
              filteredOpportunities.map((opportunity, index) => (
                <swiper-slide key={opportunity.opportunityId + index}>
                  <div className="my-4 mx-0.5">
                    <BrandOpportunityCard {...opportunity} />
                  </div>
                </swiper-slide>
              ))
            ) : (
              <div className="h-48 flex items-center justify-center text-center w-full">
                You have no "{active.label}" opportunities
              </div>
            )}
          </swiper-container>
          {filteredOpportunities?.length > 0 && (
            <>
              {arrows.left && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className={clsx(
                    "absolute -left-4 z-10 bg-white border border-queen-black/15 shadow-md w-11 rounded-full h-11 flex items-center justify-center -translate-y-1/2 top-1/2 hover:bg-queen-orange transition"
                  )}
                >
                  <FontAwesomeIcon className="rotate-180" icon={faArrowRight} />
                </button>
              )}

              {arrows.right && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute -right-4 z-10 bg-white border border-queen-black/15 shadow-md w-11 rounded-full h-11 flex items-center justify-center -translate-y-1/2 top-1/2 hover:bg-queen-orange transition"
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              )}
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center pt-28 pb-20">
      <Container className="space-y-2">
        <Subheading size="xl">No opportunities</Subheading>
        <div className="space-y-6 max-w-lg mx-auto">
          <Text>You haven't posted any opportunities yet</Text>
        </div>
      </Container>
    </div>
  );
};

export default BrandOpportunities;
