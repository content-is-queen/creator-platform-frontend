const Input = ({ children, name, ...otherProps }) => (
  <div className="relative z-0 w-full group">
    <input
      className="block py-3.5 px-0 w-full text-sm text-queen-black bg-transparent border-0 border-b-2 border-queen-black appearance-none focus:outline-none focus:ring-0 focus:border-queen-blue peer"
      name={name}
      placeholder=" "
      id={name}
      {...otherProps}
    />
    <label
      htmlFor={name}
      className="peer-focus:font-medium absolute duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-queen-blue peer-placeholder-shown:scale-100 peer-placeholder-shown:text-queen-black/60 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 uppercase"
    >
      {children}
    </label>
  </div>
);

export default Input;
