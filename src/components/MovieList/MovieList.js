import React from 'react';
import { useSelector } from 'react-redux';
import { getAllMovies, getAllShows } from '../../features/movies/movieSlice';
import MovieCard from '../MovieCard/MovieCard';
import Slider from "react-slick";
import { settings } from '../../common/settings';
import './MovieList.scss';

import { TailSpin  } from  'react-loader-spinner';

const MovieList = () => {

    const movies = useSelector(getAllMovies);
    const shows = useSelector(getAllShows);
    const isLoading = useSelector(state => state.movies.isLoading);

    let renderMovies, renderShow = '';

    renderMovies = movies.Response === 'True' ? (
        movies.Search.map((movie, index) => {
            return <MovieCard
                key={index}
                movie={movie}
            />
        })
    ) :
        (<div className="movies-error"><h3>{movies.Error}</h3></div>);

    renderShow = shows.Response === 'True' ? (
        shows.Search.map((shows, index) => {
            return <MovieCard
                key={index}
                movie={shows}
            />
        })
    ) :
        (<div className="movies-error"><h3>{movies.Error}</h3></div>);

    return (
        <div className='movie-wrapper'>
            {
                isLoading ?
            <>
            <div className='movie-list'>
                <h2>Movies</h2>
                <div className='movie-container'>
                    <Slider {...settings}>{renderMovies}</Slider>
                </div>
            </div>
            <div className='show-list'>
                <h2>Shows</h2>
                <div className='movie-container'>
                    <Slider {...settings}>{renderShow}</Slider>
                </div>
            </div>
            </> :
            <div className='movie-loagind'>
                <TailSpin color="#00BFFF" height={160} width={160} />
            </div>
            }
        </div>
    );
};

export default MovieList;