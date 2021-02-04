import axios from 'axios'

const MOVIE_API_URL = 'http://localhost:8080/movies/';

class MovieService {

    getMoviesByName(title){
        return axios.get(MOVIE_API_URL+'name/'+title);
    }

    getMoviesById(id){
        return axios.get(MOVIE_API_URL+'id/'+id);
    }
}

export default new MovieService();