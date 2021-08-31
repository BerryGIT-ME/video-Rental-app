import Joi from "joi-browser";
import React from "react";
import Form from "./common/form";
import { genres } from "./../services/genreService";
import { getMovies, saveMovie } from "./../services/movieService";
import { toast } from "react-toastify";
//import queryString from "query-string";

class MovieForm extends Form {
  state = {
    genresList: [],
    data: {
      title: "",
      genre: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    errors: {},
    defaultValue: "",
  };

  async componentDidMount() {
    const { history, match } = this.props;
    const pageRoute = match.params.id;

    let genresList = await this.getGenre();

    if (pageRoute === "new") {
      this.loadEmptyForm(genresList);
      return;
    }

    const movieList = await getMovies();

    const existInDb = this.validatePageRoute(movieList, pageRoute);

    if (!existInDb) {
      history.replace("/not-found");
      return;
    }

    if (pageRoute !== "new") {
      this.renderForm(movieList, pageRoute, genresList);
    }
  }

  async getGenre() {
    return await genres;
  }

  loadEmptyForm(genresList) {
    const emptyGenre = { _id: "", name: "" };
    genresList = [emptyGenre, ...genresList];
    this.setState({ genresList });
  }

  validatePageRoute(movieList, pageRoute) {
    return movieList.some(
      (movie) => movie._id.toString() === pageRoute.toString()
    );
  }

  renderForm(movieList, pageRoute, genresList) {
    const movie = movieList.filter((m) => m._id === pageRoute)[0];
    let newList = [movie.genre];
    genresList.forEach((g) => {
      if (g._id === movie.genre._id) return;
      newList = [...newList, g];
    });
    let newData = { ...movie };
    delete newData._id;
    newData.genre = newData.genre._id;
    this.setState({
      data: newData,
      defaultValue: movie.genre.name,
      genresList: newList,
    });
  }

  schema = {
    title: Joi.string().required(),
    genre: Joi.string().required(),
    numberInStock: Joi.number().min(0).max(100).required(),
    dailyRentalRate: Joi.number().min(0).max(10).required(),
  };

  async doSubmit() {
    const { id } = this.props.match.params;
    const {
      data: { title, genre, numberInStock, dailyRentalRate },
    } = this.state;

    let newMovie = {
      title,
      genreId: genre,
      numberInStock: parseInt(numberInStock),
      dailyRentalRate: parseFloat(dailyRentalRate),
      publishDate: Date.now(),
    };
    if (id !== "new") {
      // modifying an existing movie
      newMovie._id = id;
    }

    try {
      await saveMovie(newMovie);
    } catch (error) {
      toast.error("Apologies, something went wrong");
      return;
    }
    this.props.history.push("/movies");
  }

  render() {
    const { genresList } = this.state;

    return (
      <>
        <h1>Movie Form:</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genre", "Genre", genresList)}
          {this.renderInput("numberInStock", "Number in Stock")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </>
    );
  }
}

export default MovieForm;
