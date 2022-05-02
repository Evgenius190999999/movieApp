import React, { useEffect } from 'react';
import MovieList from '../MovieList/MovieList';

import { useDispatch } from 'react-redux';
import { fetchAsyncMovies, fetchAsyncShows } from '../../features/movies/movieSlice';
import './Home.scss';

const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAsyncMovies())
        dispatch(fetchAsyncShows())
    }, [dispatch])

    return (
        <div>
            <div className='banner-img'></div>
                <MovieList />
        </div>
    );
};

export default Home;