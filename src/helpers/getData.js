import API from "@/api/api";

export const getOpportunitiesByUserId = async (id) => {
  try {
    if (sessionStorage.getItem("opportunities")) {
      return JSON.parse(sessionStorage.getItem("opportunities"));
    }

    const response = await API.get(`/opportunities/id/${id}`);
    sessionStorage.setItem("opportunities", JSON.stringify(response.data));
    return response.data;
  } catch (e) {
    console.error(e);
  }
};

export const getOpportunityById = async (id) => {
  try {
    const res = await API.get(`/opportunities/opportunityid/${id}`);
    return res.data;
  } catch (error) {
    throw new Error("Something went wrong when getting the opportunity");
  }
};

export const getOpportunities = async () => {
  // Prevent build failing during workflows build test
  if (process.env.APP_ENV === "development") {
    return [];
  }

  try {
    const res = await API.get("/opportunities");
    return res.data.message;
  } catch (error) {
    throw new Error("Something went wrong with getting opportunities");
  }
};
