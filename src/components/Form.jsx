const Form = ({ errors, setErrors, children, onSubmit, ...otherProps }) => {
  const handleSubmit = (e) => {
    setErrors({});
    e.preventDefault();
    onSubmit();
  };
  return (
    <>
      <form onSubmit={handleSubmit} {...otherProps}>
        {children}
      </form>
      {errors?.message && (
        <div className="border border-red-700 bg-red-100 text-red-700 mt-4 py-2 px-4">
          <p>{errors.message}</p>
        </div>
      )}
    </>
  );
};

export default Form;
