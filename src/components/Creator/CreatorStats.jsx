"use client";

import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/context/UserContext";

import StatsPanel from "@/components/StatsPanel";
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebase.config";

const CreatorStats = () => {
  const { user } = useUser();

  const userId = user?.uid;

  const { data: applications, isPending } = useQuery({
    queryKey: ["application", userId],
    queryFn: async () => {
      const q = query(
        collection(db, "applications"),
        where("creatorId", "==", userId)
      );

      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    },
    enabled: !!userId,
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
