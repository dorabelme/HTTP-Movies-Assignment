import React, { Component } from "react";
import axios from "axios";
import { Link, Route } from "react-router-dom";
import MovieCard from "./MovieCard";
import UpdateForm from "./UpdateForm";

export default class MovieList extends Component {
  // constructor(props) {
  //   console.log("movielist props", props)
  //   super(props);
  //   this.state = {
  //     movies: []
  //   };
  // }


  render() {
    return (
      <>
        {/* SUBROUTE - <Route exact path="/" /> */}
        <div className="movie-list">
          {this.props.movies.map(movie => (
            <MovieDetails key={movie.id} movie={movie} movies={this.props.movies} />
          ))}
        </div>

        {/* <Route
          path="/update-movie/:id"
          render={props => {
            return <UpdateMovieForm {...this.props} movies={this.state.movies} />;
          }}
        /> */}
      </>
    );
  }
}

// NOT CLASS COMPONENT - die
function MovieDetails({ movie, movies }) {
  return (
    <Link to={`/movies/${movie.id}`}>
      <MovieCard movie={movie} movies={movies} />
    </Link>
  );
}
