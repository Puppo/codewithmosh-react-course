import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getMovies, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/genreService";

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().min(0).max(100).label("Number in Stock"),
    dailyRentalRate: Joi.number().min(0).max(10).required().label("Rate"),
  };

  handleSave = () => {
    this.props.history.push("/movies");
  };

  async componentDidMount() {
    const { data: genres } = await getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;

    if (movieId === "new") return;

    const movie = getMovies().find((movie) => movie._id === movieId);
    if (!movie) {
      return this.props.history.replace("/not-found");
    }

    this.setState({ data: this.mapMovieToViewModel(movie) });
  }

  mapMovieToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre ? movie.genre._id : "",
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = () => {
    saveMovie({
      ...this.state.data,
      _id: this.props.match.params.id,
    });
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie From</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate", "number")}

          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
