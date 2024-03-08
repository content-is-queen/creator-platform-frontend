const AuthTemplate = ({ children }) => (
  <section className="grid grid-cols-1 md:grid-cols-2 h-screen">
    <div className="hidden md:grid bg-queen-blue login-rows h-full">
      <div className="flex justify-center items-center">
        <img src="/images/Vector.png" className="pt-8" alt="background dots" />
      </div>
      <div className="login_img relative">
        <img
          src="/images/moredots.png"
          className="h-full object-cover"
          alt="background dots"
        />
      </div>
    </div>
    <div className="login_container bg-queen-white flex justify-center items-center h-full">
      {children}
    </div>
  </section>
);

export default AuthTemplate;
