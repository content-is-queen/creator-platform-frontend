import API from "./api/api";

export const getOpportunitiesByUserId = async (user_id, cb) => {
  try {
    const res = await API(`/opportunities/id/${user_id}`);

    const filteredData = res.filter((i) => i.status != "archived");
    if (cb) {
      cb(filteredData);
    }
    return filteredData;
  } catch (error) {
    throw new Error(
      `Something went wrong when getting the opportunities for user: ${user_id}`
    );
  }
};

export const getOpportunityByOpportunityId = async (opportunity_id) => {
  try {
    const res = await API(`/opportunities/opportunityid/${opportunity_id}`);
    return res;
  } catch (error) {
    throw new Error(
      `Something went wrong when getting the opportunity: ${opportunity_id}`
    );
  }
};

export const getOpportunities = async () => {
  try {
    const res = await API("/opportunities");
    return res.message;
  } catch (error) {
    throw new Error("Something went wrong with getting opportunities");
  }
};

export const getApplicationsByApplicationId = async (application_id) => {
  try {
    const res = await API(`/applications/${application_id}`);
    return res.filter((i) => i.status === "pending");
  } catch (error) {
    throw new Error(
      `Something went wrong when trying to get the applications for application: ${application_id}`
    );
  }
};
