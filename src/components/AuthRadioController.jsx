import { Controller } from "react-hook-form";

const AuthRadioController = ({ name, errors, control, options }) => (
  <div className="relative z-0 w-full group">
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field: { onChange, ...otherProps } }) => (
        <div>
          <div className="space-y">
            {options.map((option, index) => {
              const id = option.replaceAll(" ", "-").toLowerCase();
              return (
                <div className="inline-flex items-center gap-3 w-full" key={id}>
                  <input
                    type="radio"
                    className="p-1 w-5 h-5 border-queen-black appearance-none focus-visible:outline-none focus-visible:ring-2 focus-visible:border-queen-blue"
                    name={id}
                    id={id}
                    onChange={onChange}
                    {...(index === 0 ? { autoFocus: true } : {})}
                    {...otherProps}
                    value={option}
                  />
                  <label htmlFor={id} className="text-sm">
                    {option}
                  </label>
                  {errors[name] && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors[name].message}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    />
  </div>
);

export default AuthRadioController;
