"use client";

import { useEffect, useState } from "react";

import API from "@/api/api";
import useAuth from "@/hooks/useAuth";

import Card from "../Card";
import LoadingPlaceholder from "../LoadingPlaceholder";
import InfoCard from "../InfoCard";

const AdminStats = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const { data } = await API("/admin/info", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          setData(data.data);
        } catch (error) {
          console.log("Error: Getting app data:", error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [token]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {loading
        ? Array.from({ length: 4 }).map((_, index) => (
            <Card key={index}>
              <LoadingPlaceholder />
              <span className="max-w-1 inline-block">
                <LoadingPlaceholder />
              </span>
            </Card>
          ))
        : data.map((info) => <InfoCard key={info.title} {...info} />)}{" "}
    </div>
  );
};

export default AdminStats;
