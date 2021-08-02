import Joi from "joi-browser";
import React from "react";
import Form from "./common/form";
import { genres } from "./../services/fakeGenreService";
import { getMovie, getMovies, saveMovie } from "./../services/fakeMovieService";
//import queryString from "query-string";

class MovieForm extends Form {
  state = {
    data: { title: "", genre: "", numberInStock: "", rate: "" },
    errors: {},
    setup: false,
    validUrl: true,
    defaultValue: "",
  };

  constructor(props) {
    super();
    const {
      match: { params },
    } = props;

    // check if url is valid
    const movieId = params.id;
    if (movieId === "new") return;
    const movieList = getMovies();
    const existInDb = movieList.some(
      (movie) => movie._id.toString() === movieId.toString()
    );
    this.state.validUrl = existInDb;
  }

  componentDidMount() {
    const {
      state: { validUrl, setup },
      props: { history, match },
    } = this;

    if (!validUrl) {
      history.push("/not-found");
      return;
    }

    const movieId = match.params.id;
    if (movieId !== "new" && setup === false) {
      //update state
      const movie = getMovie(movieId);
      let newData = {};
      newData.title = movie.title;
      newData.genre = movie.genre._id;
      newData.numberInStock = movie.numberInStock;
      newData.rate = movie.dailyRentalRate;
      this.setState({
        data: newData,
        setup: true,
        defaultValue: movie.genre.name,
      });
    }
  }

  schema = {
    title: Joi.string().required(),
    genre: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(100).required(),
    rate: Joi.number().min(0).max(10).required(),
  };

  handleSelect = (e) => {
    console.log(e.currentTarget.name);
  };

  doSubmit() {
    const { id } = this.props.match.params;
    const {
      data: { title, genre, numberInStock, rate },
    } = this.state;

    let newMovie = {
      title,
      genreId: genre,
      numberInStock: parseInt(numberInStock),
      dailyRentalRate: parseFloat(rate),
      publishDate: Date.now(),
    };
    if (id !== "new") {
      // modifying an existing movie
      newMovie._id = id;
    }

    saveMovie(newMovie);
    this.props.history.push("/movies");
    return;
  }

  render() {
    return (
      <>
        <h1>Movie Form:</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genre", "Genre", genres)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("rate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </>
    );
  }
}

export default MovieForm;
