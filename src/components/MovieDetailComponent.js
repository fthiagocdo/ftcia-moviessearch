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
        }

        this.returnToSearch = this.returnToSearch.bind(this);
    }

    componentDidMount(){
        MovieService.getMoviesById(this.state.id).then((response) => {
            this.setState({ movieDetail: response.data})
        });
    }

    returnToSearch() {
        const { cookies } = this.props;
        cookies.set('activeSearch', 'true', { path: '/' });

        this.props.history.push(`/`);
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
                            <td>Name</td>
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
                                <td>{this.state.name}</td>  
                            </tr>
                        }
                    </tbody>
                </table>

                <button onClick={this.returnToSearch} className="btn btn-info">Voltar</button>
            </div>
        )
    }
}

export default withCookies(MovieDetailComponent)