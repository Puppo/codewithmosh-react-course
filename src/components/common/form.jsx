import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = {
      abortEarly: false,
    };
    const result = Joi.validate(this.state.data, this.schema, options);
    if (!result.error) return null;

    return result.error.details
      .map((item) => ({
        field: item.path[0],
        message: item.message,
      }))
      .reduce(
        (a, { field, message }) => ({ ...a, ...{ [field]: message } }),
        {}
      );
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return !error ? null : error.details[0].message;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  };

  renderSelect = (
    name,
    label,
    options,
    valuePropertyName = "_id",
    textPropertyName = "name"
  ) => {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        label={label}
        value={data[name]}
        error={errors[name]}
        options={options}
        valuePropertyName={valuePropertyName}
        textPropertyName={textPropertyName}
        onChange={this.handleChange}
      />
    );
  };

  renderButton = (label) => (
    <button
      disabled={this.validate()}
      type="submit"
      className="btn btn-primary"
    >
      {label}
    </button>
  );
}

export default Form;
