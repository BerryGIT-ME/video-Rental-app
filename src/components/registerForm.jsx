import { registerUser } from "../services/userService";
import { toast } from "react-toastify";
import React from "react";
import auth from "../services/authService";
import Joi from "joi-browser";
import Form from "./common/form";

class RegisterForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
      name: "",
    },
    errors: {},
  };

  //   username = React.createRef();
  //   componentDidMount() {
  //     this.username.current.focus();
  //   }
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().min(2).required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const { headers } = await registerUser(this.state.data);
      auth.loginWithJwt(headers["x-auth-token"]);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        toast("something went wrong");
        let errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
