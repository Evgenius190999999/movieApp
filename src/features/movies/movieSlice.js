import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from '../../common/apis/movieApi';
import { APIkey } from '../../common/apis/movieApiKey';

export const fetchAsyncMovies = createAsyncThunk(
    'movies/fetchAsyncMovies',
    async (term = 'Marvel') => {
        const response = await movieApi.get(`?apiKey=${APIkey}&s=${term}&type=movie`)
        return response.data;
    }
);

export const fetchAsyncShows = createAsyncThunk(
    'movies/fetchAsyncShows',
    async (term = 'Friends') => {
        const response = await movieApi.get(`?apiKey=${APIkey}&s=${term}&type=series`)
        return response.data;
    }
);

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
    'movies/fetchAsyncMovieOrShowDetail',
    async (id) => {
        const response = await movieApi.get(`?apiKey=${APIkey}&i=${id}&plot=full`)
        return response.data;
    }
);

const initialState = {
    movies: {},
    shows: {},
    selectMovieOrShow: {},
    isLoading: true,
};

export const movieSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        removeSelectedMovieOrShow: (state) => {
            state.selectMovieOrShow = {};
        }
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: (state) => {
            console.log('Movies pending');
            state.isLoading = false;
        },
        [fetchAsyncMovies.fulfilled]: (state, action) => {
            console.log('Movies fulfilled');
            state.movies = action.payload;
            state.isLoading = true;
        },
        [fetchAsyncMovies.rejected]: () => {console.log('Movies rejected')},

        [fetchAsyncShows.pending]: (state) => {
            console.log('Shows pending');
            state.isLoading = false;
        },
        [fetchAsyncShows.fulfilled]: (state, action) => {
            console.log('Shows fulfilled');
            state.shows = action.payload;
            state.isLoading = true;
        },
        [fetchAsyncShows.rejected]: () => {console.log('Shows rejected')},

        [fetchAsyncMovieOrShowDetail.pending]: () => {console.log('Detail pending')},
        [fetchAsyncMovieOrShowDetail.fulfilled]: (state, action) => {
            console.log('Detail fulfilled');
            state.selectMovieOrShow = action.payload;
        },
        [fetchAsyncMovieOrShowDetail.rejected]: () => {console.log('Detail rejected')},
    }
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedMovieOrShow = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;