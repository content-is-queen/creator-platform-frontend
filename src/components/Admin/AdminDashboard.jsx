import { useEffect, useState } from "react";

import API from "@/api/api";
import useToken from "@/hooks/useToken";

import Heading from "../Heading";
import InfoCard from "../InfoCard";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const { token } = useToken();

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const { data } = await API("/admin/info", {
            "Content-Type": "application/json",

            Authorization: `Bearer ${token}`,
          });
          console.log(data);
          setData(data);
        } catch (error) {
          console.log("Error: Getting app data:", error);
        }
      })();
    }
    console.log(token);
  }, [token]);

  return (
    <section className="pl-[18%] pr-[18%] pt-10">
      <Heading>Overview</Heading>

      <div className="grid grid-cols-4 gap-x-4 gap-y-8 pt-8">
        {data.map((info, index) => (
          <InfoCard key={index} title={info.title} value={info.value} />
        ))}
      </div>
    </section>
  );
};

export default AdminDashboard;

AdminDashboard.role = "admin";
