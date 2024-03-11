const Heading = ({ tag = "p", children }) => {
  const Tag = tag;

  return (
    <Tag className="uppercase text-queen-black font-anton text-lg md:text-4xl">
      {children}
    </Tag>
  );
};

export default Heading;
