import axios from 'axios'

const MOVIE_API_URL = 'http://localhost:8080/movies/';

class MovieService {

    getMoviesByName(){
        return axios.get(MOVIE_API_URL+'name/man');
    }

    getMoviesById(){
        return axios.get(MOVIE_API_URL+'id/tt0371746');
    }
}

export default new MovieService();