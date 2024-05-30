import useToken from "@/hooks/useToken";
import Heading from "../Heading";
import InfoCard from "../InfoCard";
import { useEffect, useState } from "react";
import API from "@/api/api";
import Loading from "@/app/(auth)/loading";

const AdminDashboard = () => {
  const { token } = useToken();
  const [infoData, setInfoData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchAdminInfo = async () => {
    try {
      setIsLoading(true);
      const response = await API("/admin/info", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setInfoData(response?.data?.data);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchAdminInfo();
    }
  }, [token]);

  return (
    <>
      <section className="pl-[18%] pr-[18%] pt-10">
        <Heading>Overview</Heading>

        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-4 gap-x-4 gap-y-8 pt-8">
            {infoData?.map((info, index) => (
              <InfoCard key={index} title={info?.title} value={info?.value} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default AdminDashboard;

AdminDashboard.role = "admin";
