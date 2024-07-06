import { useEffect, useState } from "react";

import API from "@/api/api";
import useAuth from "@/hooks/useAuth";

import Heading from "../Heading";
import InfoCard from "../InfoCard";
import Container from "../Container";
import CreateOpportunityModal from "../Brand/CreateOpportunityModal";
import BrandOpportunities from "../Brand/BrandOpportunities";
import Card from "../Card";
import LoadingPlaceholder from "../LoadingPlaceholder";

const AdminDashboard = () => {
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
    <div>
      <section className="bg-queen-yellow py-12 md:py-20">
        <Container size="5xl" className="space-y-8">
          <Heading size="4xl">Overview</Heading>

          <div className="grid grid-cols-3 gap-4">
            {loading ? (
              <>
                {Array.from({ length: 4 }).map((_, index) => (
                  <Card key={index}>
                    <LoadingPlaceholder />
                    <span className="max-w-1 inline-block">
                      <LoadingPlaceholder />
                    </span>
                  </Card>
                ))}
              </>
            ) : (
              data.map((info) => <InfoCard key={info.title} {...info} />)
            )}
          </div>
        </Container>
      </section>

      <section className="bg-queen-white py-12 md:py-20">
        <Container size="5xl" className="space-y-8">
          <div className="flex justify-between items-center mb-8">
            <Heading>Projects</Heading>
            <CreateOpportunityModal />
          </div>
          <BrandOpportunities />
        </Container>
      </section>
    </div>
  );
};

export default AdminDashboard;

AdminDashboard.roles = ["admin", "super_admin"];
