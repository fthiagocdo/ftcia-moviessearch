import React from 'react';
import MovieService from '../services/MovieService';

class MovieSearchComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            movies:[]
        }
    }

    componentDidMount(){
        MovieService.getMoviesByName().then((response) => {
            this.setState({ movies: response.data})
        });
    }

    render (){
        return (
            <div>
                <h1 className="text-center"> Movies List</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td> Movie Id</td>
                            <td> Title</td>
                            <td> Year</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.movies.map(movie => 
                                <tr key={movie.imdbID}>
                                     <td> {movie.imdbID}</td>   
                                     <td> {movie.Title}</td>   
                                     <td> {movie.Year}</td>      
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default MovieSearchComponent