import axios from 'axios'

const MOVIE_API_URL = 'http://localhost:8080/movies/';

class MovieService {

    getMoviesByName(){
        return axios.get(MOVIE_API_URL+'name/man');
    }
}

export default new MovieService();