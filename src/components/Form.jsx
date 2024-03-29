"use client";

const Form = ({ fields }) => {
  return (
    <div className="space-y-8">
      {fields.map(({ children, multiple, name, options }) => {
        if (options) {
          return (
            <div key={name}>
              <label for={name}>{children}</label>
              <select
                className="w-full"
                name={name}
                id={name}
                {...(multiple && { multiple: true })}
              >
                <option>Select</option>
                {options.map((option, index) => (
                  <option key={`${option}-${index}`}>{option}</option>
                ))}
              </select>
            </div>
          );
        }
        return (
          <div key={name}>
            <label for={name}>{children}</label>
            <input
              className="py-3 placeholder:text-queen-black/40 block px-0 w-full text-queen-black bg-transparent border-0 border-b-2 border-queen-black appearance-none focus:outline-none focus:ring-0 focus:border-queen-blue peer"
              name={name}
              id={name}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Form;
