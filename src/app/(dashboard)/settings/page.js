import Button from "@/components/Button";

const General = () => (
  <>
    <div>
      <label for="username">Username</label>
      <input
        type="text"
        className="py-3 placeholder:text-queen-black/40 block px-0 w-full text-queen-black bg-transparent border-0 border-b border-queen-black appearance-none focus:outline-none focus:ring-0 focus:border-queen-blue peer"
        name="username"
        id="username"
      />
    </div>
    <div>
      <label for="email">Email</label>
      <input
        type="text"
        className="py-3 placeholder:text-queen-black/40 block px-0 w-full text-queen-black bg-transparent border-0 border-b border-queen-black appearance-none focus:outline-none focus:ring-0 focus:border-queen-blue peer"
        name="email"
        id="email"
      />
    </div>
    <Button as="button" type="button">
      Update
    </Button>
  </>
);

export default General;
