import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import MovieList from "./components/movieList";
import NavBar from "./components/NavBar";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";

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
            path="/login"
            render={(reactProps) => <LoginForm {...reactProps} />}
          />

          <Route
            path="/movies/:id"
            render={(reactProps) => <MovieForm {...reactProps} />}
          />
          <Route
            path="/movies"
            render={(reactProps) => <MovieList {...reactProps} />}
          />
          <Route
            path="/rentals"
            render={(reactProps) => <Rentals {...reactProps} />}
          />
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </>
  );
}

export default App;
