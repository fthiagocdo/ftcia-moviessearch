import React from 'react';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import MovieService from '../services/MovieService';

class MovieDetailComponent extends React.Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
      };

    constructor(props){
        super(props)

        this.state = {
            id: this.props.match.params.id,
            movieDetail:[],
            imdbRating: '',
            rottenRating: '',
            previousSearch: this.props.cookies.get('previousSearch') || null
        }

        this.returnToSearch = this.returnToSearch.bind(this);
        this.AddRemoveFavorites = this.AddRemoveFavorites.bind(this);
        this.getLabelFavorites = this.getLabelFavorites.bind(this);
    }

    componentDidMount(){
        MovieService.getMoviesById(this.state.id).then((response) => {
            this.setState({ 
                movieDetail: response.data,
                imdbRating: response.data.Ratings.find(element => element.Source === 'Internet Movie Database'),
                rottenRating: response.data.Ratings.find(element => element.Source === 'Rotten Tomatoes'),   
            })
        });
    }

    returnToSearch() {
        this.props.cookies.remove('previousSearch', { path: '/' });
        
        if(this.state.previousSearch) {
            this.props.history.push(`/search/${this.state.previousSearch}`);
        } else {
            this.props.history.push(`/`);
        }
    }

    AddRemoveFavorites() {
        const isFavorite = this.props.cookies.get(this.state.id) || null;
        
        if(isFavorite){
            this.props.cookies.remove(this.state.movieDetail.imdbID, { path: '/' });
        }else{
            this.props.cookies.set(this.state.movieDetail.imdbID, true, { path: '/' });
        }
    }

    getLabelFavorites() {
        const isFavorite = this.props.cookies.get(this.state.id) || null;
        if(isFavorite){
            return 'Remove from favorites';
        } else {
            return 'Add to favorites';
        }
    }

    render (){
        return (
            <div>

                <br></br>

                <div className="card col-md-12">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-8">
                                <h1 className="text-center" style={{marginBottom: "30px"}}>{this.state.movieDetail.Title}</h1>

                                <div className="row">
                                    <div className="col-md-3">IMDB: {this.state.imdbRating ? this.state.imdbRating.Value : ''}</div>
                                    <div className="col-md-3">Rotten: {this.state.rottenRating ? this.state.rottenRating.Value : ''}</div>
                                    <div className="col-md-4">
                                    <button className="btn btn-success" onClick={this.AddRemoveFavorites}>{ this.getLabelFavorites() }</button>
                                    </div>
                                    <div className="col-md-2"></div>
                                </div>

                                <br></br>
                                <div>Plot</div>
                                <p>{this.state.movieDetail.Plot}</p>

                                <br></br>
                                <div className="row">
                                    <div className="col-md-4">
                                    <div>Cast</div>
                                        <p>{this.state.movieDetail.Actors}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <div>Genre</div>
                                        <p>{this.state.movieDetail.Genre}</p>
                                    </div>
                                    <div className="col-md-4">
                                        <div>Director</div>
                                        <p>{this.state.movieDetail.Director}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <img src={this.state.movieDetail.Poster} class="img-fluid" alt={this.state.movieDetail.Title}></img>
                            </div>
                        </div>
                    </div>
                </div>

                <br></br>

                <button onClick={this.returnToSearch} className="btn btn-success">Back</button>
            </div>
        )
    }
}

export default withCookies(MovieDetailComponent)