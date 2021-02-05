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
            previousSearch: this.props.match.params.previousSearch || null,
            movies:[],
            noResults: false
        }

        this.getMovieDetail = this.getMovieDetail.bind(this);
        this.searchMovie = this.searchMovie.bind(this);

        this.changeSearchKeyHandler = this.changeSearchKeyHandler.bind(this);
    }

    componentDidMount(){
        if(this.state.previousSearch){
            const key = this.state.previousSearch; 
            this.setState({searchKey: key});

            MovieService.getMoviesByName(key).then((response) => {
                this.setState({ movies: response.data})
            });
        }        
    }

    changeSearchKeyHandler = (event) => {
        this.setState({searchKey: event.target.value});
    }

    searchMovie() {
        if(this.state.searchKey !== ''){
            MovieService.getMoviesByName(this.state.searchKey).then((response) => {
                this.setState({ 
                    movies: response.data,
                    noResults: response.data.length ? false : true
                })

                console.log('noResults => '+this.state.noResults);
            });
        }
    }

    getMovieDetail(id) {
        this.setCookie();
        this.props.history.push(`/detail/${id}`);
    }

    setCookie() {
        this.props.cookies.set('previousSearch', this.state.searchKey, { path: '/' });
    }

    getList(){
        if(this.state.movies.length){
            return <div>
                        <div className="card col-md-12">
                            <h1 className="text-center" style={{ marginTop: "10px" }}>Search Results</h1>
                            <div className="card-body">
                                <div className="row">
                                    {
                                        this.state.movies.map(movie => 
                                            <img src={movie.Poster} className="img-fluid col-md-3" alt={movie.Title} 
                                                onClick={ () => this.getMovieDetail(movie.imdbID) } style={{ marginTop: "10px" }}></img>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
        } else if(this.state.noResults) {
            return <div>
                        <div className="card col-md-12">
                            <div className="card-body">
                                <div className="row">
                                    <div className="text-center col-md-12">No results.</div>
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

                <div className="card col-md-12" style={{ marginBottom: "30px" }}>
                    <div className="card-body">
                        <div className="row">
                            <input name="searchKey" className="col-md-10" 
                                value={this.state.searchKey} onChange={this.changeSearchKeyHandler}/>
                            <div className="col-md-2 text-center">
                                <button className="btn btn-success" onClick={this.searchMovie} style={{ width: "80%" }}>Search</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                {this.getList()}

                <br></br>
            </div>
        )
    }
}

export default withCookies(MovieSearchComponent)