import React from "react";

const Validation_errors = ({ errors }) => {
  return (
    <div>
      <h5 className="text-danger">Fix these errors</h5>
      <div>
        {errors.map((err, i) => {
          return (
            <p className="text-danger" key={i}>
              {i + 1} : {err}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Validation_errors;
