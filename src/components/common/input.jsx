import React, { Fragment } from "react";

const Input = ({ label, error, ...rest }) => {
  return (
    <Fragment>
      <label className="block font-semibold mt-3"> {label} </label>
      <input
        {...rest}
        className="border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-indigo-500 focus:ring-1 rounded-md"
      />
      {error && (
        <p
          id="standard_error_help"
          className="mt-2 text-xs text-red-600 dark:text-red-400"
        >
          <span className="font-medium">Oh, snapp!</span> {error}
        </p>
      )}
    </Fragment>
  );
};

export default Input;
