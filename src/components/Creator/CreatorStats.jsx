"use client";

import { useQuery } from "@tanstack/react-query";
import API from "@/api/api";
import { useUser } from "@/context/UserContext";

import StatsPanel from "@/components/StatsPanel";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";

const CreatorStats = () => {
  const { user } = useUser();

  const { isPending, data: applications } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const { data } = await API.get(`applications/user/${user.uid}`);
      return data.message;
    },
  });
  return isPending ? (
    <div className="mx-auto w-72 flex items-center justify-center flex-wrap md:flex-nowrap">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className="bg-queen-white shadow-lg text-center rounded-full text-queen-black shrink-0 inline-flex w-1/2 pb-[50%] relative border-queen-blue border"
        >
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className="max-w-20">
              <LoadingPlaceholder.Bar dark />
            </div>
            <div className="max-w-10">
              <LoadingPlaceholder.Bar dark />
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <StatsPanel applications={applications} />
  );
};

export default CreatorStats;
