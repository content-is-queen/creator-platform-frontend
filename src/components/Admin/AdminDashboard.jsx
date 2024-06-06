import { useEffect, useState } from "react";

import API from "@/api/api";
import useToken from "@/hooks/useToken";

import Heading from "../Heading";
import InfoCard from "../InfoCard";
import Container from "../Container";
import Spinner from "../Spinner";
import CreateOpportunityModal from "../Brand/CreateOpportunityModal";
import BrandOpportunities from "../Brand/BrandOpportunities";
import CreateUserForm from "./CreateUserForm";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useToken();

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
    <div className="h-full py-12 md:py-20">
      <Container size="5xl" className="space-y-20">
        <section>
          <div className="flex justify-between">
            <Heading size="4xl">Overview</Heading>

            <div className="space-x-4">
              <CreateOpportunityModal />
              <CreateUserForm />
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-80">
              <Spinner className="h-8 w-8" />
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-x-4 gap-y-8 pt-8">
              {data.map((info, index) => (
                <InfoCard key={index} {...info} />
              ))}
            </div>
          )}
        </section>

        <section className="space-y-8">
          <Heading>Projects</Heading>
          <BrandOpportunities />
        </section>
      </Container>
    </div>
  );
};

export default AdminDashboard;

AdminDashboard.role = "admin";
