import React, { Component } from "react";
import Input from "./common/input";
import Joi from "joi-browser";

class LoginForm extends Component {
  state = {
    account: {
      username: "",
      password: "",
    },
    errors: {},
  };

  //   username = React.createRef();
  //   componentDidMount() {
  //     this.username.current.focus();
  //   }
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };
  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);
    if (!error) return;

    let errors = {};
    error.details.map((error) => (errors[error.path[0]] = error.message));

    return Object.keys(errors).length === 0 ? {} : errors;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;
    console.log("submitted");
  };

  validateProperty = (name, value) => {
    console.log(name, value);
    if (name === "username") {
      if (value === "") return "Username is empty";
    }
    if ((name = "password")) {
      if (value === "") return "Password is empty";
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input.name, input.value);
    errors[input.name] = errorMessage;
    const acc = { ...this.state.account };
    acc[input.name] = input.value;
    this.setState({ account: acc, errors });
  };

  render() {
    const {
      account: { username, password },
      errors,
    } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <Input
            name="username"
            label="Username"
            value={username}
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            label="Password"
            value={password}
            onChange={this.handleChange}
            error={errors.password}
          />
          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
