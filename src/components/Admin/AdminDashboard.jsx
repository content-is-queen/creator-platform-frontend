import Heading from "../Heading";
import InfoCard from "../InfoCard";

const getAppData = async () => {};

const AdminDashboard = async () => {
  const appData = await getAppData();
  return (
    <section className="pl-[18%] pr-[18%] pt-10">
      <Heading>Overview</Heading>

      <div className="grid grid-cols-4 gap-x-4 gap-y-8 pt-8">
        {infoData.map((info, index) => (
          <InfoCard key={index} title={info.title} value={info.value} />
        ))}
      </div>
    </section>
  );
};

export default AdminDashboard;

AdminDashboard.role = "admin";
