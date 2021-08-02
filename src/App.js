import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from "./components/movieList";
import NavBar from "./components/NavBar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";

function App() {
  return (
    <>
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
          <Route path="/login" component={LoginForm} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" component={MovieList} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </>
  );
}

export default App;
