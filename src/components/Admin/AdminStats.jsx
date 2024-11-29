"use client";

import { useEffect, useState } from "react";

import API from "@/api/api";

import Card from "../Card";
import LoadingPlaceholder from "../LoadingPlaceholder";
import InfoCard from "../InfoCard";

const AdminStats = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await API("/admin/info", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          },
        });
        setData(data.data);
      } catch (error) {
        console.log("Error: Getting app data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      {Boolean(loading || data.length < 1)
        ? Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <LoadingPlaceholder />
              <span className="max-w-12 inline-block">
                <LoadingPlaceholder />
              </span>
            </Card>
          ))
        : data.map((info) => <InfoCard key={info.title} {...info} />)}{" "}
    </div>
  );
};

export default AdminStats;
