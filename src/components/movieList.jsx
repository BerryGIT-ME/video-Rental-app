import { Component, Fragment } from "react";
import * as list from "../services/fakeMovieService";
import MovieTable from "./movieTable";
import Pagination from "./common/pagination";
import ListGroup from "./common/ListGroup";
import { genres } from "./../services/fakeGenreService";

class MovieList extends Component {
  //getMovieToShow = (movies, page = 1) => {};
  constructor() {
    super();
    let moviePerPage = 2;
    let movieList = list.getMovies();
    let moviesToShow = list.getMovieToShow(movieList, moviePerPage);

    movieList = movieList.map((movie) => {
      movie.like = false;
      return movie;
    });

    this.state.moviePerPage = moviePerPage;
    this.state.movies = movieList;
    this.state.sortedMovies = movieList;
    this.state.moviesToShow = moviesToShow;
  }

  state = {
    movies: [],
    sortedMovies: [],
    moviesToShow: [],
    showPage: 1,
    showGenre: "All Genres",
    sortMode: "ascending",
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
  };

  //___________________________

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

  handleSort = (str) => {
    let _sortedmovies = [...this.state.sortedMovies];
    let sorted;
    let sortMode;
    if (str === "title" || str === "genre") {
      if (str === "title") {
        sorted = _sortedmovies.sort((a, b) => {
          let x = a[str].toLowerCase();
          let y = b[str].toLowerCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
        });
      }
      if (str === "genre") {
        sorted = _sortedmovies.sort((a, b) => {
          let x = a[str].name.toLowerCase();
          let y = b[str].name.toLowerCase();
          if (x < y) {
            return -1;
          }
          if (x > y) {
            return 1;
          }
          return 0;
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

  render() {
    const { movies, sortedMovies, moviesToShow, moviePerPage } = this.state;
    return (
      <Fragment>
        <div className="row addpadding">
          <div className="col-md-3">
            <ListGroup
              Genre={genres}
              showGenre={this.state.showGenre}
              handleListGroup={this.handleListGroup}
            />
          </div>
          <div className="col">
            {movies.length > 0 && (
              <p>
                Showing <span>{sortedMovies.length}</span> movies in the
                database
              </p>
            )}
            {movies.length > 0 ? (
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
      </Fragment>
    );
  }
}

export default MovieList;
