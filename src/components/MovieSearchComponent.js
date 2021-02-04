/* eslint-disable no-template-curly-in-string */
import React from 'react';
import MovieService from '../services/MovieService';

class MovieSearchComponent extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            searchKey: '',
            movies:[]
        }

        this.getMovieDetail = this.getMovieDetail.bind(this);
        this.searchMovie = this.searchMovie.bind(this);

        this.changeSearchKeyHandler = this.changeSearchKeyHandler.bind(this);
    }

    changeSearchKeyHandler = (event) => {
        this.setState({searchKey: event.target.value});
    }

    getMovieDetail(id) {
        this.props.history.push(`/detail/${id}`);
    }

    searchMovie() {
        if(this.state.searchKey !== ''){
            MovieService.getMoviesByName(this.state.searchKey).then((response) => {
                this.setState({ movies: response.data})
            });
        }
    }

    getList(){
        if(this.state.searchKey === ''){
            return
        }else if(this.state.movies.length){
            return <div>
                    <h1 className="text-center">Results</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <td>Imdb Id</td>
                                <td>Title</td>
                                <td>Year</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.movies.map(movie => 
                                    <tr key={movie.imdbID}>
                                        <td>{movie.imdbID}</td>   
                                        <td>{movie.Title}</td>   
                                        <td>{movie.Year}</td>
                                        <td>
                                            <button onClick={ () => this.getMovieDetail(movie.imdbID) } className="btn btn-info">Info</button>
                                        </td>      
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
        }else{
            return <div> 
                    <h1 className="text-center">Results</h1>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <td>Imdb Id</td>
                                <td>Title</td>
                                <td>Year</td>
                                <td>Actions</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td className="text-center">No results found.</td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
        }
    }

    render (){
        return (
            <div>
                <br></br>

                <div className="row">
                    <div className="card col-md-12">
                        <div className="card-body">
                            <input name="searchKey" className="col-md-10" 
                                value={this.state.searchKey} onChange={this.changeSearchKeyHandler}/>
                            <button className="btn btn-success col-md-2" onClick={this.searchMovie}>Search</button>
                        </div>
                    </div>
                </div>
                
                {this.getList()}
            </div>
        )
    }
}

export default MovieSearchComponent