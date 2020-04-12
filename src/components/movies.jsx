import _ from "lodash";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Pagination from "./common/pagination";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import SearchBox from "./common/searchBox";
import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";

class Movies extends Component {
  state = {
    genres: [],
    movies: [],
    selectedGenre: null,
    searchQuery: "",
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
    deleteMovie(movie._id);
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
    this.setState({ selectedGenre: genre, pager, searchQuery: "" });
  };

  handleSearch = (searchQuery) => {
    this.setState({
      searchQuery,
      selectedGenre: null,
      pager: { ...this.state.pager, page: 1 },
    });
  };

  async componentDidMount() {
    const { data: httpGenres } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...httpGenres];
    const selectedGenre = genres[0];
    this.setState({
      movies: getMovies(),
      genres,
      selectedGenre,
    });
  }

  getPagedData = () => {
    const {
      selectedGenre,
      pager,
      sortColumn,
      searchQuery,
      movies: allMovies,
    } = this.state;
    let filtered = allMovies;
    if (searchQuery.trim()) {
      filtered = filtered.filter(({ title }) =>
        title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = filtered.filter((x) => x.genre._id === selectedGenre._id);
    }
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
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelected}
            />
          </div>
          <div className="col">
            <Link className="btn btn-primary" to="/movies/new">
              New Movie
            </Link>
            <h4 className="my-3">
              Showing {totalCount} movies in the database.
            </h4>
            <SearchBox
              value={this.state.searchQuery}
              onChange={this.handleSearch}
            />
            <MoviesTable
              movies={movies}
              movieCount={totalCount}
              sortColumn={this.state.sortColumn}
              onDelete={this.handleDelete}
              onLike={this.handleLike}
              onSort={this.handleSort}
              onSearch={this.handleSearch}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={this.state.pager.size}
              currentPage={this.state.pager.page}
              onChange={this.handleChangePage}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
