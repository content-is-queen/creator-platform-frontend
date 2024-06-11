"use client";

import clsx from "clsx";

import { useState, useRef, useEffect, useCallback } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { register } from "swiper/element/bundle";

import Tabs from "@/components/Tabs";
import Container from "../Container";
import BrandOpportunityCard from "@/components/Brand/BrandOpportunityCard";

import { useUser } from "@/context/UserContext";
import useOpportunities from "@/hooks/useOpportunities";
import Spinner from "../Spinner";

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
      label: "Completed",
      id: "completed",
    },
  ];

  const { user } = useUser();

  const [active, setActive] = useState(OPTIONS[0]);
  const [filteredOpportunities, setFilteredOpportunities] = useState([]);
  const [arrows, setArrows] = useState({ left: false, right: false });

  const { opportunities, setOpportunities, loading } = useOpportunities(
    { user_id: user.uid },
    (data) => {
      setOpportunities(
        data.opportunities.filter((i) => i.status !== "archived")
      );

      setFilteredOpportunities(
        data.opportunities.filter((i) => i.status !== "archived")
      );
    }
  );

  const swiperRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!swiperRef.current) return;
    swiperRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    const swiperContainer = swiperRef.current;

    const handleSwiperProgress = (event) => {
      const [swiper] = event.detail;

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

    const params = {
      slidesPerView: 3,
      spaceBetween: 20,
      breakpoints: {
        425: { slidesPerView: 1 },
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
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
    if (opportunities && swiperContainer) {
      Object.assign(swiperContainer, params);
      swiperContainer.initialize();

      swiperContainer.addEventListener("swiperprogress", handleSwiperProgress);
    }

    return () =>
      swiperContainer &&
      swiperContainer.removeEventListener(
        "swiperprogress",
        handleSwiperProgress
      );
  }, [filteredOpportunities, active]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-44">
        <Spinner className="h-6 w-6" />
      </div>
    );

  if (opportunities?.length > 0) {
    return (
      <section>
        <Tabs options={OPTIONS} active={active} setActive={setActive} />
        <div className="relative">
          <swiper-container ref={swiperRef} init="false" class="my-6">
            {filteredOpportunities.length > 0 ? (
              filteredOpportunities.map((opportunity) => (
                <swiper-slide key={opportunity.opportunity_id}>
                  <div className="m-0.5">
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
          {filteredOpportunities.length > 0 && (
            <>
              {arrows.left && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className={clsx(
                    "absolute -left-4 z-10 bg-white shadow-md w-11 rounded-full h-11 flex items-center justify-center -translate-y-1/2 top-1/2 hover:bg-queen-orange transition"
                  )}
                >
                  <FontAwesomeIcon className="rotate-180" icon={faArrowRight} />
                </button>
              )}

              {arrows.right && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute -right-4 z-10 bg-white shadow-md w-11 rounded-full h-11 flex items-center justify-center -translate-y-1/2 top-1/2 hover:bg-queen-orange transition"
                >
                  <FontAwesomeIcon icon={faArrowRight} />
                </button>
              )}
            </>
          )}
        </div>
      </section>
    );
  }

  return (
    <div className="text-center pt-28 pb-20">
      <Container className="space-y-2">
        <p className="font-subheading font-bold text-xl text-queen-black">
          No projects
        </p>
        <div className="space-y-6 max-w-lg mx-auto">
          <p>You haven't posted any projects yet</p>
        </div>
      </Container>
    </div>
  );
};

export default BrandOpportunities;
