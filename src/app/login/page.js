import Link from "next/link";

import Heading from "@/components/Heading";
import AuthTemplate from "@/components/AuthTemplate";
import Text from "@/components/Text";
import Button from "@/components/Button";
import Input from "@/components/Input";

const FIELDS = [
  { name: "email", type: "email", children: "Email Address" },
  { name: "password", type: "password", children: "Password" },
];

const Login = () => (
  <AuthTemplate>
    <Heading>Welcome back</Heading>
    <form>
      <div className="space-y-6">
        {FIELDS.map(({ children, ...otherProps }) => (
          <Input {...otherProps}>{children}</Input>
        ))}
        <Text size="sm" className="!mt-2">
          <Link href="#">Forgot password?</Link>
        </Text>
      </div>

      <Button href="/dashboard" className="mt-8">
        Sign in
      </Button>

      <Text size="sm" className="mt-4">
        Don't have an account?{" "}
        <Link href="/signup" className="font-medium">
          Signup
        </Link>
      </Text>
    </form>
  </AuthTemplate>
);

export default Login;
