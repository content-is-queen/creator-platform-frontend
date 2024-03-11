import Dots from "./Patterns/Dots";

const AuthTemplate = ({ children }) => (
  <section className="grid h-screen md:grid-cols-2">
    <div className="bg-queen-blue flex items-center justify-center relative h-full overflow-hidden">
      <div className="h-20 md:h-auto flex justify-center items-center">
        <img
          className="h-32 md:h-auto"
          src="/images/CiQ_Logo_Stacked.svg"
          alt="Content is queen"
        />
      </div>
      <Dots className="absolute -left-48 -bottom-60 md:-left-40 md:-bottom-40 text-queen-orange" />
    </div>
    <div className="bg-queen-white flex justify-center items-center h-full">
      {children}
    </div>
  </section>
);

export default AuthTemplate;
