import React, { Component } from "react";
import "./App.css";
import Movies from "./components/movies";
import { getMovies } from "./services/fakeMovieService";

class App extends Component {
  state = {
    movies: getMovies().map((movie) => ({
      id: movie.id,
      title: movie.title,
      genre: movie.genre.name,
      stock: movie.numberInStock,
      rate: movie.dailyRentalRate,
      liked: movie.liked || false,
    })),
  };

  handleDelete = (movie) => {
    this.setState({
      movies: this.state.movies.filter((mov) => mov.id !== movie.id),
    });
  };

  handleToggleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movie.liked;
    this.setState({ movies });
  };

  render() {
    return (
      <main className="container">
        <Movies
          movies={this.state.movies}
          onToggleLike={this.handleToggleLike}
          onDelete={this.handleDelete}
        ></Movies>
      </main>
    );
  }
}

export default App;
