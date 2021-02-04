/* eslint-disable no-template-curly-in-string */
import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import MovieService from '../services/MovieService';

class MovieSearchComponent extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };

    constructor(props){
        super(props)

        this.state = {
            searchKey: '',
            movies:[]
        }

        this.getMovieDetail = this.getMovieDetail.bind(this);
        this.searchMovie = this.searchMovie.bind(this);
        //this.setCookie = this.setCookie.bind(this);

        this.changeSearchKeyHandler = this.changeSearchKeyHandler.bind(this);
    }

    changeSearchKeyHandler = (event) => {
        this.setState({searchKey: event.target.value});
    }

    searchMovie() {
        if(this.state.searchKey !== ''){
            MovieService.getMoviesByName(this.state.searchKey).then((response) => {
                this.setState({ movies: response.data})
            });
        }
    }

    getMovieDetail(id) {
        //this.setCookie();
        this.props.history.push(`/detail/${id}`);
    }

    /*setCookie() {
        const { cookies } = this.props;
        cookies.set('lastSearch', this.state.searchKey, { path: '/' });
    }*/

    getList(){
        if(this.state.movies.length){
            return <div>
                    <div className="row">
                        <div className="card col-md-12">
                            <h1 className="text-center" style={{ marginTop: "10px" }}>Search Results</h1>
                            <div className="card-body">
                                {
                                    this.state.movies.map(movie => 
                                        <img src={movie.Poster} class="img-fluid col-md-3" alt={movie.Title} 
                                            onClick={ () => this.getMovieDetail(movie.imdbID) } style={{ marginTop: "10px" }}></img>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
        }
    }

    render (){
        return (
            <div>
                <br></br>

                <div className="row" style={{ marginBottom: "30px" }}>
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

export default withCookies(MovieSearchComponent)