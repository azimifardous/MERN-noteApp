import React, { Fragment } from "react";

const Input = ({ label, error, ...rest }) => {
  return (
    <Fragment>
      <label className="authLabel"> {label} </label>
      <input {...rest} className="authInput" />
      {error && (
        <p className="error">
          <span className="font-medium">Oh, snapp!</span> {error}
        </p>
      )}
    </Fragment>
  );
};

export default Input;
