import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
    },
    {
      path: "genre.name",
      label: "Genre",
    },
    {
      path: "numberInStock",
      label: "Stock",
    },
    {
      path: "dailyRentalRate",
      label: "Rate",
    },
    {
      key: "like",
      content: (movie) => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      ),
    },
    {
      key: "delete",
      content: (movie) => (
        <button
          className="btn btn-danger"
          onClick={() => this.props.onDelete(movie)}
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, movieCount } = this.props;
    return (
      <React.Fragment>
        {!movieCount ? (
          <h4>No movies in the database</h4>
        ) : (
          <React.Fragment>
            <div className="row m-1">
              <div className="col">
                <h4>Showing {movieCount} movies in the database.</h4>
              </div>
            </div>
            <div className="row m-1">
              <div className="col">
                <Table
                  columns={this.columns}
                  sortColumn={this.props.sortColumn}
                  data={movies}
                  onSort={this.props.onSort}
                />
              </div>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default MoviesTable;
