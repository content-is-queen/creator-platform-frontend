"use client";

import { useUser } from "@/context/UserContext";

import Form from "@/components/Form";
import Button from "@/components/Button";


const Dashboard = () => {
  const { user } = useUser();
  return (
   <h1>Welcome to the  page</h1>
  );
};

export default Dashboard;
