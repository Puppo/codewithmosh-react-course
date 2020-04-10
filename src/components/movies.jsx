import React, { Component } from "react";
import Like from "./like";

class Movies extends Component {
  render() {
    return this.renderMovies();
  }

  renderMovies() {
    if (!this.props.movies.length) {
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
          <h4>Showing {this.props.movies.length} movies in the database.</h4>
        </div>
      </div>
    );
  }

  renderMoviesHeader() {
    return (
      <div className="row m-1">
        <div className="col-3">
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
        <div className="col-1">
          <b>&nbsp;</b>
        </div>
        <div className="col-2">
          <b>&nbsp;</b>
        </div>
      </div>
    );
  }

  renderMoviesRows() {
    return this.props.movies.map((movie) => {
      return (
        <div key={movie.id} className="row m-1">
          <div className="col-3">{movie.title}</div>
          <div className="col-2">{movie.genre}</div>
          <div className="col-2">{movie.stock}</div>
          <div className="col-2">{movie.rate}</div>
          <div className="col-1">
            <Like
              liked={movie.liked}
              onClick={() => this.props.onToggleLike(movie)}
            />
          </div>
          <div className="col-2">
            <button
              className="btn btn-danger"
              onClick={() => this.props.onDelete(movie)}
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
