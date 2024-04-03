import Button from "@/components/Button";
import Heading from "@/components/Heading";

const Input = () => (
  <input
    type="text"
    className="max-w-12 h-12 text-center border-queen-black/80 border-2 bg-transparent"
  />
);

const Verify = () => (
  <div className="text-center">
    <Heading size="3xl" className="mb-2">
      Verify your email address
    </Heading>
    <p className="mb-6">
      We're sure you're you, but we still need to verify that.
    </p>
    <div className="flex gap-2 justify-center">
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
    </div>
    <Button type="button" as="button" className="mt-8">
      Verify
    </Button>
  </div>
);

export default Verify;
