import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
  state = {
    movies: getMovies(),
  };
  render() {
    return this.renderMovies();
  }

  deleteHandle = (movie) => {
    this.setState({
      movies: this.state.movies.filter((mov) => mov._id !== movie._id),
    });
  };

  renderMovies() {
    if (!this.state.movies.length) {
      return (
        <div className="row">
          <div className="col">
            <h4>No movies in the database</h4>
          </div>
        </div>
      );
    } else {
      return (
        <React.Fragment>
          {this.renderMoviesTitle()}
          {this.renderMoviesHeader()}
          {this.renderMoviesRows()}
        </React.Fragment>
      );
    }
  }

  renderMoviesTitle() {
    return (
      <div className="row m-1">
        <div className="col">
          <h4>Showing {this.state.movies.length} movies in the database.</h4>
        </div>
      </div>
    );
  }

  renderMoviesHeader() {
    return (
      <div className="row m-1">
        <div className="col-4">
          <b>Title</b>
        </div>
        <div className="col-2">
          <b>Genre</b>
        </div>
        <div className="col-2">
          <b>Stock</b>
        </div>
        <div className="col-2">
          <b>Rate</b>
        </div>
        <div className="col-2">
          <b>&nbsp;</b>
        </div>
      </div>
    );
  }

  renderMoviesRows() {
    return this.state.movies.map((movie) => {
      return (
        <div key={movie._id} className="row m-1">
          <div className="col-4">{movie.title}</div>
          <div className="col-2">{movie.genre.name}</div>
          <div className="col-2">{movie.numberInStock}</div>
          <div className="col-2">{movie.dailyRentalRate}</div>
          <div className="col-2">
            <button
              className="btn btn-danger"
              onClick={() => this.deleteHandle(movie)}
            >
              Delete
            </button>
          </div>
        </div>
      );
    });
  }
}

export default Movies;
