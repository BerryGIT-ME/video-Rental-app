import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import auth from "./services/authService";
import MovieList from "./components/movieList";
import NavBar from "./components/NavBar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import ProtectedRoute from "./components/common/protectedRoute";
import "react-toastify/dist/ReactToastify.css";

console.log(process.env);
class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.decode();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <>
        <ToastContainer />
        <NavBar />
        <main className="container">
          <Switch>
            <Route
              path="/customers"
              render={(reactProps) => <Customers {...reactProps} />}
            />
            <Route
              path="/register"
              render={(reactProps) => <RegisterForm {...reactProps} />}
            />
            <Route
              path="/login"
              render={(reactprops) => {
                if (user) return <Redirect to="/movies" />;
                return <LoginForm {...reactprops} />;
              }}
            />

            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={(reactProps) => <MovieList {...reactProps} />}
            />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
