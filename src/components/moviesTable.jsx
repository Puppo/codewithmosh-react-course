import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";
import authService from "../services/authService";

class MoviesTable extends Component {
  columns = [
    {
      key: "title",
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
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
  ];

  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        className="btn btn-danger"
        onClick={() => this.props.onDelete(movie)}
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = authService.getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.deleteColumn);
    }
  }

  render() {
    const { movies, movieCount } = this.props;
    return !movieCount ? (
      <h4>No movies in the database</h4>
    ) : (
      <Table
        columns={this.columns}
        sortColumn={this.props.sortColumn}
        data={movies}
        onSort={this.props.onSort}
      />
    );
  }
}

export default MoviesTable;
