import React from 'react';
import MovieService from '../services/MovieService';

class MovieDetailComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            movieDetail:[]
        }
    }

    componentDidMount(){
        MovieService.getMoviesById(this.state.id).then((response) => {
            this.setState({ movieDetail: response.data})
        });
    }

    render (){
        return (
            <div>
                <h1 className="text-center">Movie Detail</h1>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <td>ImdbID</td>
                            <td>Title</td>
                            <td>Year</td>
                            <td>Plot</td>
                            <td>Actors</td>
                            <td>Genre</td>
                            <td>Director</td>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                            <tr key={this.state.movieDetail.imdbID}>
                                <td>{this.state.movieDetail.imdbID}</td>   
                                <td>{this.state.movieDetail.Title}</td>   
                                <td>{this.state.movieDetail.Year}</td>   
                                <td>{this.state.movieDetail.Plot}</td> 
                                <td>{this.state.movieDetail.Actors}</td> 
                                <td>{this.state.movieDetail.Genre}</td> 
                                <td>{this.state.movieDetail.Director}</td>  
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default MovieDetailComponent