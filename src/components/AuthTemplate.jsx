const AuthTemplate = ({ children }) => (
  <section className="grid h-screen md:grid-cols-2">
    <div className="hidden bg-queen-blue login-rows h-full md:grid">
      <div className="flex justify-center items-center">
        <img
          src="/images/stacked-logo.png"
          className="pt-8"
          alt="background dots"
        />
      </div>
      <div className="relative">
        <img
          src="/images/moredots.png"
          className="h-full object-cover"
          alt="background dots"
        />
      </div>
    </div>
    <div className="bg-queen-white flex justify-center items-center h-full">
      {children}
    </div>
  </section>
);

export default AuthTemplate;
