import React from "react";

const Select = ({
  name,
  label,
  error,
  options,
  valuePropertyName,
  textPropertyName,
  ...rest
}) => {
  const createOptionsKey = (opt) => name + "_" + opt[valuePropertyName];
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} {...rest} className="form-control">
        <option value="" />
        {options.map((opt) => (
          <option key={createOptionsKey(opt)} value={opt[valuePropertyName]}>
            {opt[textPropertyName]}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

Select.defaultProps = {
  valuePropertyName: "_id",
  textPropertyName: "name",
};

export default Select;
