import React, { Component } from "react";
import "./App.css";
import Movies from "./components/movies";
import Pagination from "./components/common/pagination";
import { getMovies } from "./services/fakeMovieService";
import { paginate } from "./utils/paginate";

class App extends Component {
  state = {
    movies: getMovies().map((movie) => ({
      id: movie._id,
      title: movie.title,
      genre: movie.genre.name,
      stock: movie.numberInStock,
      rate: movie.dailyRentalRate,
      liked: movie.liked || false,
    })),
    pager: {
      size: 5,
      page: 1,
    },
  };

  handleDelete = (movie) => {
    this.setState({
      movies: this.state.movies.filter((mov) => mov.id !== movie.id),
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

  handleToggleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movie.liked;
    this.setState({ movies });
  };

  render() {
    const { length: itemsCount } = this.state.movies;
    const movies = paginate(
      this.state.movies,
      this.state.pager.page,
      this.state.pager.size
    );
    return (
      <main className="container">
        <Movies
          movies={movies}
          moviesCount={itemsCount}
          onToggleLike={this.handleToggleLike}
          onDelete={this.handleDelete}
        ></Movies>

        <div className="row m-1">
          <div className="col">
            <Pagination
              itemsCount={itemsCount}
              pageSize={this.state.pager.size}
              currentPage={this.state.pager.page}
              onChange={this.handleChangePage}
            />
          </div>
        </div>
      </main>
    );
  }
}

export default App;
