import _ from "lodash";
import React, { Component } from "react";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";

class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    selectedGenre: null,
    pager: {
      size: 3,
      page: 1,
    },
    sortColumn: {
      path: "title",
      order: "asc",
    },
  };

  handleDelete = (movie) => {
    this.setState({
      movies: this.state.movies.filter((mov) => mov._id !== movie._id),
    });
  };

  handleChangePage = (page) => {
    this.setState({
      pager: {
        ...this.state.pager,
        page,
      },
    });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movie.liked;
    this.setState({ movies });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleGenreSelected = (genre) => {
    const pager = {
      ...this.state.pager,
      page: 1,
    };
    this.setState({ selectedGenre: genre, pager });
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    const selectedGenre = genres[0];
    this.setState({
      movies: getMovies(),
      genres,
      selectedGenre,
    });
  }

  getPagedData = () => {
    const { selectedGenre, pager, sortColumn } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? this.state.movies.filter((x) => x.genre._id === selectedGenre._id)
        : this.state.movies;
    const { length: totalCount } = filtered;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const data = paginate(sorted, pager.page, pager.size);
    return {
      totalCount,
      data,
    };
  };

  render() {
    const { totalCount, data: movies } = this.getPagedData();
    return (
      <main className="container">
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelected}
            />
          </div>
          <div className="col">
            <div className="row">
              <div className="col">
                <MoviesTable
                  movies={movies}
                  movieCount={totalCount}
                  sortColumn={this.state.sortColumn}
                  onDelete={this.handleDelete}
                  onLike={this.handleLike}
                  onSort={this.handleSort}
                />
              </div>
            </div>
            <div className="row m-1">
              <div className="col">
                <Pagination
                  itemsCount={totalCount}
                  pageSize={this.state.pager.size}
                  currentPage={this.state.pager.page}
                  onChange={this.handleChangePage}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Movies;
