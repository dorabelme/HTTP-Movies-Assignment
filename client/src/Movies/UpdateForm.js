import React, { useState, useEffect } from "react";
import axios from "axios";

const initialMovie = {
    title: "",
    director: "",
    metascore: "",
    stars: []
};
const UpdateForm = props => {
    console.log(props)
    const [movie, setMovie] = useState(initialMovie);
    console.log(movie);

    useEffect(() => {
        console.log(props.match.params.id)
        const id = props.match.params.id;
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                console.log(res)
                setMovie(res.data);
            })
            .catch(err => console.log(err.response))
    }, [props.match.params.id]);

    const changeHandler = event => {
        setMovie({ ...movie, [event.target.name]: event.target.value })

    };

    const handleSubmit = event => {
        event.preventDefault();
        const id = props.match.params.id;
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                console.log(res);
                // 1 - edit the movie (PUT)
                // 2 - update movielist with new movie
                    props.setMovies(props.movies.map(movie => movie.id != id ? movie : res.data))
                // 3 - reset form to blank state
                setMovie(initialMovie)
                // 4 - reroute to movie list
                props.history.push('/')
            })
            // .catch(err => console.log(err.response));
    };

return (
    <div>
        <h2>Update Item</h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                onChange={changeHandler}
                placeholder="title"
                value={movie.title}
            />
            <div className="baseline" />

            <input
                type="text"
                name="director"
                onChange={changeHandler}
                placeholder="director"
                value={movie.director}
            />
            <div className="baseline" />

            <input
                type="number"
                name="metascore"
                onChange={changeHandler}
                placeholder="metascore"
                value={movie.metascore}
            />
            <div className="baseline" />

            <input
                type="string"
                name="actors"
                onChange={changeHandler}
                placeholder="actors"
                value={movie.stars[0]}
            />
            <div className="baseline" />

            <input
                type="string"
                name="actors"
                onChange={changeHandler}
                placeholder="actors"
                value={movie.stars[1]}
            />
            <div className="baseline" />

            <input
                type="string"
                name="actors"
                onChange={changeHandler}
                placeholder="actors"
                value={movie.stars[2]}
            />
            <div className="baseline" />

            <button className="md-button form-button">Update Movie</button>
        </form>
    </div>
);
};

export default UpdateForm;
