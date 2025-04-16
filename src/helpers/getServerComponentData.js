// named functions used for retrieving data for server components

import API from "@/api/api";

export const getOpportunitiesByUserId = async (uid) => {
  // Prevent build failing during workflows build test
  if (process.env.APP_ENV === "development" || !uid) {
    return [];
  }

  try {
    const { data } = await API.get(`/opportunities/id/${uid}`);
    return data.filter((i) => i.status !== "archived");
  } catch (error) {
    console.error("Error: Getting opportunities by user id", error);
  }
};

export const getOpportunityById = async (id) => {
  // Prevent build failing during workflows build test
  if (process.env.APP_ENV === "development" || !id) {
    return [];
  }

  try {
    const { data } = await API.get(`/opportunities/opportunityid/${id}`);
    return data;
  } catch (error) {
    console.error("Error: Getting opportunities by id", error);
  }
};

export const getOpportunities = async () => {
  // Prevent build failing during workflows build test
  if (process.env.APP_ENV === "development") {
    return [];
  }

  try {
    const { data } = await API.get("/opportunities?limit=0");
    return data.message.opportunities;
  } catch (error) {
    console.log("Error: Getting opportunties:", error);
  }
};
