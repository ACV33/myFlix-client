import React from 'react';
import axios from 'axios';
import LoginView from '../login-view/login-view';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
        };
    }

    componentDidMount() {
        axios.get('https://ashlis-movie-api.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }
    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: movie
        });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    render() {
        const { movies, selectedMovie } = this.state;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        if (movies.length === 0) return <div className="main-view" />;

        return (
            <div className="main-view">
                {selectedMovie ? (
                    <Row className="justify-content-md-center">
                        <Col md={8}>
                            <MovieView
                                movie={selectedMovie}
                                onBackClick={(newSelectedMovie) => {
                                    this.setSelectedMovie(newSelectedMovie);
                                }} />
                        </Col>
                    </Row>
                )
                    : (
                        <Row className="justify-content-md-center">
                            {movies.map(movie => (
                                <Col md={3}>
                                    <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                                </Col>
                            ))}
                        </Row>

                    )}
            </div>
        );
    }
}
