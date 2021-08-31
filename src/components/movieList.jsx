import { Component, Fragment } from "react";
import MovieTable from "./movieTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/ListGroup";
import * as movieService from "../services/movieService";
import { genres } from "./../services/genreService";
import Input from "./common/input";
import { Link } from "react-router-dom";
import * as stringHelper from "./../utils/stringHelper";
import SearchBox from "./common/searchBox";
import logger from "../services/logService";
import { toast } from "react-toastify";
import auth from "../services/authService";

class MovieList extends Component {
  state = {
    movies: [],
    genreList: [],
    moviePerPage: 4,
    pageNo: 1,
    showGenre: "All Genres",
    sortMode: "ascending",
    search: "",
  };

  async componentDidMount() {
    const genreList = await genres;
    const movies = await movieService.getMovies();
    movies.map((movie) => {
      movie.like = false;
      return movie;
    });
    this.setState({ movies, genreList });
  }

  handleDelete = async (id) => {
    const _movies = [...this.state.movies];
    let newMovies = _movies.filter((movie) => movie._id !== id);

    this.setState({ movies: newMovies });

    try {
      await movieService.deleteMovie(id);
    } catch (error) {
      logger.log(error);
      if (error.response && error.response.status === 404)
        toast.error("This movie has already been deleted");
      this.setState({ movies: _movies });
    }
  };

  handleLike = (id) => {
    const movies = [...this.state.movies];
    const index = movies.findIndex((movie) => movie._id === id);
    movies[index].like = !movies[index].like;
    this.setState({ movies });
  };

  handlePageSelect = (pageNo) => {
    this.setState({ pageNo });
  };

  handleListGroup = (showGenre) => {
    this.setState({ showGenre });
  };

  handleSort = (sortParameter) => {
    let _movies = [...this.state.movies];
    const { movies, sortMode } = stringHelper.sort(
      sortParameter,
      _movies,
      this.state.sortMode
    );
    this.setState({ movies, sortMode });
  };

  handleSearch = (query) => {
    this.setState({ search: query, showGenre: "All Genres" });
  };

  getTableData = () => {
    const { movies, moviePerPage, pageNo, search, showGenre: str } = this.state;
    let sortedMovies = [...movies];
    let moviesToShow;
    let newMovies;

    if (search) {
      sortedMovies = sortedMovies.filter((movie) =>
        movie.title.toLowerCase().startsWith(search.toLowerCase())
      );
    }

    if (str === "All Genres") {
      moviesToShow = movieService.getMovieToShow(
        sortedMovies,
        moviePerPage,
        pageNo
      );
    } else {
      newMovies = sortedMovies.filter((movie) => movie.genre.name === str);
      moviesToShow = movieService.getMovieToShow(
        newMovies,
        moviePerPage,
        pageNo
      );
      return { sortedMovies: newMovies, moviesToShow };
    }

    return { sortedMovies, moviesToShow };
  };

  renderInput(name, placeholder, onChange, value, type = "text") {
    return (
      <Input
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        type={type}
      />
    );
  }

  render() {
    const { movies, moviePerPage } = this.state;
    const user = auth.decode();
    const { sortedMovies, moviesToShow } = this.getTableData();

    return (
      <>
        <div className="row addpadding">
          <div className="col-md-3">
            <ListGroup
              Genre={this.state.genreList}
              showGenre={this.state.showGenre}
              handleListGroup={this.handleListGroup}
            />
          </div>
          <div className="col m-2">
            {user && (
              <Link className="btn btn-primary" to="/movies/new">
                New Movie
              </Link>
            )}
            {movies.length > 0 && (
              <p className="moviListParagraph">
                Showing <span>{sortedMovies.length}</span> movies in the
                database
              </p>
            )}
            <SearchBox
              name="search"
              placeholder="Search..."
              onChange={this.handleSearch}
              value={this.state.search}
            />
            {}
            {sortedMovies.length > 0 ? (
              <MovieTable
                moviesToShow={moviesToShow}
                onLike={this.handleLike}
                onDelete={this.handleDelete}
                onSort={this.handleSort}
              />
            ) : (
              <p>There are no movies Left in the database</p>
            )}
            {sortedMovies.length > moviePerPage && (
              <Pagination
                maxPage={Math.ceil(sortedMovies.length / moviePerPage)}
                list={sortedMovies}
                moviePerPage={moviePerPage}
                onSelectPage={this.handlePageSelect}
                currentPage={this.state.pageNo}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default MovieList;
