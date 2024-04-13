const Keys = {
  ISSERVER: typeof window === "undefined",
  DEFAULT_API: `${process.env.NEXT_PUBLIC_API_KEY}/api/v1`,
  REACT_APP_ACCESS_TOKEN:
    process.env.REACT_APP_ACCESS_TOKEN || "PLKL98928s&*989238uriolsd",
};

export default Keys;
