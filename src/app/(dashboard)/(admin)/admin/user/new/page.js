import CreateUserForm from "@/components/CreateUserForm";
import Heading from "@/components/Heading";

const NewUsers = async () => {
  return (
    <div>
      <Heading>Create new user</Heading>
      <CreateUserForm />
    </div>
  );
};

export default NewUsers;
