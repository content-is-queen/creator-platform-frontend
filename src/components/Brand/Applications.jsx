"use client";

import { useEffect, useState } from "react";
import API from "@/api/api";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import Text from "@/components/Text";
import BrandApplicationCard from "@/components/Brand/BrandApplicationCard";

const Applications = ({ id }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const getApplications = async () => {
    try {
      const { data } = await API(`/applications/opportunity/${id}`);
      setApplications(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void getApplications();
  }, []);

  return (
    <div className="pt-28 pb-20">
      <Container className="space-y-2 text-center mb-12">
        <Heading>Applications</Heading>
      </Container>
      <Container className="grid md:grid-cols-2 gap-4">
        {!loading && (
          <>
            {applications.length > 0 ? (
              <>
                {applications.map((application) => (
                  <BrandApplicationCard key={application.id} {...application} />
                ))}
              </>
            ) : (
              <Text>No applications</Text>
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default Applications;
