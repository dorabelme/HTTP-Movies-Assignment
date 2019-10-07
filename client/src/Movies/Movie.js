import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";


export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  deleteMovie = event => {
    const id = this.props.match.params.id;
    event.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        // const newArr = props.items.filter(i => i.id !== item.id)
          // const newArr = [props.items, res.data]
        console.log(res)
        const newArr = this.props.movies.filter(movie => movie.id != id)
        this.props.setMovies(newArr)
        this.props.history.push('/')
      })
        .catch(err => console.log(err.response));
    };

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div>
          <div className="save-button" onClick={this.saveMovie}>
            Save
          </div>
          <div className="update-button" onClick={() => {this.props.history.push(`/update-movie/${this.state.movie.id}`) }}>
            Update
          </div>
          <div className="delete-button" onClick={this.deleteMovie}>
            Delete
          </div>
        </div>
        </div>
    );
  }
}
