"use client";

import BrandApplicationCard from "@/components/Brand/BrandApplicationCard";
import Text from "@/components/Text";
import Card from "../Card";

const BrandApplications = ({ applications, title, opportunityId }) => {
  return (
    <div>
      {applications.length > 0 ? (
        <>
          {applications.map((application) => (
            <BrandApplicationCard
              key={application.applicationId}
              applications={applications}
              opportunityTitle={title}
              opportunityId={opportunityId}
              {...application}
            />
          ))}
        </>
      ) : (
        <Card>
          <Text className="text-center">No Applications were found</Text>
        </Card>
      )}
    </div>
  );
};

export default BrandApplications;
