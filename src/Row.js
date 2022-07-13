import React, { useEffect, useState } from 'react';
import axios from './axios';
import "./css/Row.css";
import YouTube from 'react-youtube';

const base_url = 'https://image.tmdb.org/t/p/original/';

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = async (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            const urlParams = await fetch('https://api.themoviedb.org/3/movie/' + movie + '/videos?api_key=2f34a5de90a1db83acd5004cb7cca238&language=en-US', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const result = await urlParams.json();
            setTrailerUrl(result['results'][0]['key']);
        }
    };

    return (
        <div className='row'>
            <h2>{title}</h2>

            <div className='row__posters'>
                {movies.map(movie => (
                    <img
                        className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                        key={movie.id}
                        onClick={() => handleClick(movie.id)}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name} />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row