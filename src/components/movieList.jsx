import { Component, Fragment } from "react";
import * as list from "../services/fakeMovieService";
import MovieTable from "./movieTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/ListGroup";
import { genres } from "./../services/fakeGenreService";
import Input from "./common/input";
import { Link } from "react-router-dom";
import * as stringHelper from "./../utils/stringHelper";
import SearchBox from "./common/searchBox";

class MovieList extends Component {
  constructor() {
    super();

    this.state.moviePerPage = 4;
    this.state.movies = list.getMovies();
    this.state.sortedMovies = this.state.movies.map((movie) => {
      movie.like = false;
      return movie;
    });
    this.state.moviesToShow = list.getMovieToShow(
      this.state.movies,
      this.state.moviePerPage
    );
  }

  state = {
    movies: [],
    sortedMovies: [],
    moviesToShow: [],
    showPage: 1,
    showGenre: "All Genres",
    sortMode: "ascending",
    search: "",
  };

  showListGroup = (str, movies) => {
    let moviesToShow;
    let newMovies;

    if (str === "All Genres") {
      moviesToShow = list.getMovieToShow(movies, this.state.moviePerPage);
      this.setState({ moviesToShow, showGenre: str, sortedMovies: movies });
    } else {
      newMovies = movies.filter((movie) => movie.genre.name === str);
      moviesToShow = list.getMovieToShow(newMovies, this.state.moviePerPage);
      this.setState({ moviesToShow, showGenre: str, sortedMovies: newMovies });
    }

    return {
      moviesToShow: moviesToShow,
      showGenre: str,
      sortedMovies: str === "All Genres" ? movies : newMovies,
    };
  };

  /**
   *
   *
   * event handlers section
   */

  handleDelete = (id) => {
    const _movies = [...this.state.movies];
    let newMovies = _movies.filter((movie) => movie._id !== id);
    const _moviesToShow = list.getMovieToShow(
      newMovies,
      this.state.moviePerPage,
      this.state.showPage
    );

    if (this.showGenre === "All Genres") {
      this.setState({
        movies: newMovies,
        sortedMovies: newMovies,
        _moviesToShow,
      });
    } else {
      const { moviesToShow, sortedMovies } = this.showListGroup(
        this.state.showGenre,
        newMovies
      );
      this.setState({
        movies: newMovies,
        sortedMovies: sortedMovies,
        moviesToShow: moviesToShow,
      });
    }
    list.deleteMovie(id);
  };

  handleLike = (id) => {
    let newMovieList = this.state.movies.map((movie) => {
      if (movie._id === id) {
        movie.like = !movie.like;
      }
      return movie;
    });
    this.setState({ movies: newMovieList, sortedMovies: newMovieList });
  };

  handleSelectPage = (pageNo) => {
    const { sortedMovies, moviePerPage } = this.state;
    let moviesToShow = list.getMovieToShow(sortedMovies, moviePerPage, pageNo);
    this.setState({ moviesToShow, showPage: pageNo });
  };

  handleListGroup = (str) => {
    const { movies } = this.state;
    const { moviesToShow, showGenre, sortedMovies } = this.showListGroup(
      str,
      movies
    );
    this.setState({ moviesToShow, showGenre, sortedMovies, showPage: 1 });
  };

  handleSort = (str) => {
    let _sortedmovies = [...this.state.sortedMovies];
    let sorted;
    let sortMode;
    if (str === "title" || str === "genre") {
      if (str === "title") {
        sorted = _sortedmovies.sort((a, b) => {
          let x = a[str].toLowerCase();
          let y = b[str].toLowerCase();
          return stringHelper.sortString(x, y);
        });
      }
      if (str === "genre") {
        sorted = _sortedmovies.sort((a, b) => {
          let x = a[str].name.toLowerCase();
          let y = b[str].name.toLowerCase();
          return stringHelper.sortString(x, y);
        });
      }
    } else {
      sorted = _sortedmovies.sort((a, b) => a[str] - b[str]);
    }
    sortMode = "descending";
    if (this.state.sortMode === "descending") {
      sorted = sorted.reverse();
      sortMode = "ascending";
    }
    let moviesToShow = list.getMovieToShow(sorted, this.state.moviePerPage);
    this.setState({ sortedMovies: sorted, moviesToShow, sortMode });
  };

  /**
   *
   *  render section
   */

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

  handleSearch = (query) => {
    const searchResult = this.state.movies.filter((movie) =>
      movie.title.toLowerCase().startsWith(query.toLowerCase())
    );
    this.showListGroup("All Genres", searchResult);
    this.setState({ search: query });
  };
  render() {
    const { movies, sortedMovies, moviesToShow, moviePerPage } = this.state;
    return (
      <>
        <div className="row addpadding">
          <div className="col-md-3">
            <ListGroup
              Genre={genres}
              showGenre={this.state.showGenre}
              handleListGroup={this.handleListGroup}
            />
          </div>
          <div className="col m-2">
            <Link className="btn btn-primary" to="/movies/new">
              New Movie
            </Link>
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
                onSelectPage={this.handleSelectPage}
                currentPage={this.state.showPage}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default MovieList;
